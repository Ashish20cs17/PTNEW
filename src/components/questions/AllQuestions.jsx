import React, { useEffect, useState, useRef } from "react";
import { database } from "../firebase/FirebaseSetup";
import { ref, get, remove, update, serverTimestamp } from "firebase/database";
import supabase from "../supabase/SupabaseConfig";
import { ToastContainer, toast } from "react-toastify";
import parse from "html-react-parser";
import JoditEditor from "jodit-react";
import DynamicMathSelector from "../DynamicMathSelector";
import "./AllQuestions.css";

import "../upload/Upload.css";

const AllQuestions = () => {
  const [questions, setQuestions] = useState([]);
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [error, setError] = useState(null);
  const [editingQuestion, setEditingQuestion] = useState(null);
  const [grade, setGrade] = useState("all");
  const [topic, setTopic] = useState("all");
  const [topicList, setTopicList] = useState("all");
  const [difficultyLevel, setDifficultyLevel] = useState("all");
  const [questionType, setQuestionType] = useState("all");

  useEffect(() => {
    const fetchAllQuestions = async () => {
      try {
        const questionsRef = ref(database, "questions");
        const snapshot = await get(questionsRef);
        if (!snapshot.exists()) {
          setError("No questions found!");
          return;
        }
        const data = snapshot.val();
        const allFetchedQuestions = Object.entries(data).map(([id, question]) => ({ id, ...question })).reverse();
        setQuestions(allFetchedQuestions);
        setFilteredQuestions(allFetchedQuestions);
      } catch (err) {
        console.error("Error fetching questions:", err);
        setError("Failed to fetch questions");
      }
    };
    fetchAllQuestions();
  }, []);

useEffect(() => {
  if (!questions || questions.length === 0) {
    setFilteredQuestions([]);
    return;
  }

  // Normalize filter values so empty strings or null are treated as "all"
  const safeGrade = grade && grade !== "" ? grade : "all";
  const safeTopic = topic && topic !== "" ? topic : "all";
  const safeTopicList = topicList && topicList !== "" ? topicList : "all";
  const safeDifficulty = difficultyLevel && difficultyLevel !== "" ? difficultyLevel : "all";
  const safeQuestionType = questionType && questionType !== "" ? questionType : "all";

  const filtered = questions.filter((q) => {
    return (
      (safeGrade === "all" || q.grade === safeGrade) &&
      (safeTopic === "all" || q.topic === safeTopic) &&
      (safeTopicList === "all" || q.topicList === safeTopicList) &&
      (safeDifficulty === "all" || q.difficultyLevel === safeDifficulty) &&
      (safeQuestionType === "all" || q.type === safeQuestionType)
    );
  });

  setFilteredQuestions(filtered);
}, [questions, grade, topic, topicList, difficultyLevel, questionType]);


  const handleEdit = (question) => setEditingQuestion(question);

  const handleDelete = async (question) => {
    const { id, questionImage, options, correctAnswer } = question;
    await Promise.all([
      deleteImageFromSupabase(questionImage),
      ...(options?.map((opt) => deleteImageFromSupabase(opt.image)) || []),
      deleteImageFromSupabase(correctAnswer?.image),
    ]);

    try {
      await remove(ref(database, `questions/${id}`));
      setQuestions((prev) => prev.filter((q) => q.id !== id));
      setFilteredQuestions((prev) => prev.filter((q) => q.id !== id));
      toast.success("Question deleted successfully");
    } catch (err) {
      console.error("Error deleting question:", err);
      setError("Failed to delete question");
    }
  };

  const deleteImageFromSupabase = async (url) => {
    if (!url) return;
    const filePath = url.split("public/questions/")[1];
    try {
      const { error } = await supabase.storage.from("questions").remove([filePath]);
      if (error) throw error;
    } catch (err) {
      console.error("Failed to delete image from Supabase:", err);
    }
  };

  const isHTML = (str) => /<[^>]+>/.test(str);

  const UploadComponent = ({ questionData, onSave, onCancel }) => {
    const [formData, setFormData] = useState({
      questionType: questionData?.type || "MCQ",
      question: questionData?.question || "",
      questionImageUrl: questionData?.questionImage || null,
      options: questionData?.options?.map((opt) => ({ text: opt.text || "", image: opt.image || null })) || Array(4).fill({ text: "", image: null }),
      correctAnswer: questionData?.correctAnswer || { text: "", image: null },
      grade: questionData?.grade || "",
      topic: questionData?.topic || "",
      topicList: questionData?.topicList || "",
      difficultyLevel: questionData?.difficultyLevel || "",
    });
    const [loading, setLoading] = useState(false);
    const editor = useRef(null);

    const config = {
      readonly: false,
      toolbar: true,
      placeholder: "Enter your question here...",
      enter: "BR",
      removeButtons: "source",
      fullpage: false,
      cleanHTML: true,
      sanitize: true,
      autofocus: false,
      askBeforePasteHTML: false,
    };

    const uploadImageToSupabase = async (file) => {
      if (!file) return null;
      const fileExt = file.name.split(".").pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const { data, error } = await supabase.storage.from("questions").upload(fileName, file);
      return error ? null : supabase.storage.from("questions").getPublicUrl(fileName).data.publicUrl;
    };

    const handleImageChange = async (e, field, index) => {
      const file = e.target.files[0];
      const url = await uploadImageToSupabase(file);
      if (!url) return;
      setFormData((prev) => {
        if (field === "questionImageUrl") return { ...prev, [field]: url };
        if (field === "options") {
          const newOptions = [...prev.options];
          newOptions[index].image = url;
          return { ...prev, options: newOptions };
        }
        return { ...prev, correctAnswer: { ...prev.correctAnswer, image: url } };
      });
    };

    const handleSave = async () => {
      if (!formData.question && !formData.questionImageUrl) {
        toast.error("Please enter a question or upload an image");
        return;
      }
      if (!questionData?.id) {
        toast.error("Invalid question ID. Cannot update.");
        return;
      }
      setLoading(true);
      try {
        const questionRef = ref(database, `questions/${questionData.id}`);
        const updatedData = {
          ...formData,
          timestamp: serverTimestamp(),
          date: new Date().toISOString().split("T")[0],
          type: formData.questionType,
        };
        await update(questionRef, updatedData);
        setQuestions((prev) => prev.map((q) => (q.id === questionData.id ? { ...q, ...updatedData } : q)));
        setFilteredQuestions((prev) => prev.map((q) => (q.id === questionData.id ? { ...q, ...updatedData } : q)));
        toast.success("Question updated successfully");
        onSave();
      } catch (err) {
        console.error("Error updating question:", err);
        toast.error("Failed to update question");
      } finally {
        setLoading(false);
      }
    };



const assignSetToUser = async (userId, setId) => {
    try {
        await update(ref(database, `users/${userId}/assignedSets`), {
            [setId]: {
                attachedAt: new Date().toISOString(),
            },
        });

        // Optional: update UI locally if needed
        const updatedAssignedSets = {
            ...selectedUser.assignedSets,
            [setId]: { attachedAt: new Date().toISOString() }
        };

        const updatedUser = { ...selectedUser, assignedSets: updatedAssignedSets };
        setSelectedUser(updatedUser);
        setUsers(users.map((u) => (u.id === userId ? updatedUser : u)));
        setFilteredUsers(filteredUsers.map((u) => (u.id === userId ? updatedUser : u)));

        alert(`Set ${setId} assigned to user ${userId}`);
    } catch (error) {
        console.error("Error assigning set:", error);
        alert("Failed to assign set.");
    }
};








    return (
      <div className="uploadContainer editMode">
        <h3>Edit Question</h3>
        <select value={formData.questionType} onChange={(e) => setFormData({ ...formData, questionType: e.target.value })}>
          <option value="MCQ">MCQ</option>
          <option value="FILL_IN_THE_BLANKS">Fill in the Blanks</option>
          <option value="TRIVIA">Trivia</option>
        </select>
    <JoditEditor
  ref={editor}
  value={formData.question}
  config={config}
  onBlur={(content) => setFormData({ ...formData, question: content })}
/>

        <input type="file" accept="image/*" onChange={(e) => handleImageChange(e, "questionImageUrl")} />
        {formData.questionImageUrl && <img src={formData.questionImageUrl} alt="Question" style={{ maxWidth: "100px" }} />}

        {formData.questionType !== "TRIVIA" && (
          <>
            <DynamicMathSelector
              grade={formData.grade}
              setGrade={(val) => setFormData({ ...formData, grade: val })}
              topic={formData.topic}
              setTopic={(val) => setFormData({ ...formData, topic: val })}
              topicList={formData.topicList}
              setTopicList={(val) => setFormData({ ...formData, topicList: val })}
            />
            <select value={formData.difficultyLevel} onChange={(e) => setFormData({ ...formData, difficultyLevel: e.target.value })}>
              <option value="">Select Difficulty</option>
              {["L1", "L2", "L3", "Br"].map((level) => <option key={level} value={level}>{level}</option>)}
            </select>
          </>
        )}

        {formData.questionType === "MCQ" && (
          <div className="optionsSection">
            {formData.options.map((option, index) => (
              <div key={index}>
                <input type="text" value={option.text} onChange={(e) => {
                  const newOptions = [...formData.options];
                  newOptions[index].text = e.target.value;
                  setFormData({ ...formData, options: newOptions });
                }} />
                <input type="file" accept="image/*" onChange={(e) => handleImageChange(e, "options", index)} />
                {option.image && <img src={option.image} alt={`Option ${index + 1}`} style={{ maxWidth: "100px" }} />}
              </div>
            ))}
          </div>
        )}

        {formData.questionType !== "TRIVIA" && (
          <div>
            <input type="text" value={formData.correctAnswer.text} onChange={(e) => setFormData({ ...formData, correctAnswer: { ...formData.correctAnswer, text: e.target.value } })} />
            <input type="file" accept="image/*" onChange={(e) => handleImageChange(e, "correctAnswer")} />
            {formData.correctAnswer.image && <img src={formData.correctAnswer.image} alt="Answer" style={{ maxWidth: "100px" }} />}
          </div>
        )}

        <button onClick={handleSave} disabled={loading}>{loading ? "Saving..." : "Save Changes"}</button>
        <button onClick={onCancel} disabled={loading}>Cancel</button>
        <ToastContainer />
      </div>
    );
  };

  return (
    <div className="allQuestionContainer">
      <h2>All Questions</h2>
      <hr />
      <div className="filterControls">
        {/* Using the horizontal-filters class to override DynamicMathSelector vertical styles */}
        <div className="horizontal-filters">
          <DynamicMathSelector grade={grade} setGrade={setGrade} topic={topic} setTopic={setTopic} topicList={topicList} setTopicList={setTopicList} />
          
          <div className="formGroup">
            <label htmlFor="questionTypeFilter">Question Type:</label>
            <select 
              id="questionTypeFilter"
              value={questionType} 
              onChange={(e) => setQuestionType(e.target.value)}
            >
              <option value="all">All Types</option>
              <option value="MCQ">MCQ</option>
              <option value="FILL_IN_THE_BLANKS">Fill in the Blanks</option>
              <option value="TRIVIA">Trivia</option>
            </select>
          </div>
          
          <div className="formGroup">
            <label htmlFor="difficultyFilter">Difficulty Level:</label>
            <select 
              id="difficultyFilter"
              value={difficultyLevel} 
              onChange={(e) => setDifficultyLevel(e.target.value)}
            >
              <option value="all">All Difficulty Levels</option>
              {["L1", "L2", "L3", "Br"].map((level) => <option key={level} value={level}>{level}</option>)}
            </select>
          </div>
        </div>
      </div>

      {editingQuestion && <UploadComponent questionData={editingQuestion} onSave={() => setEditingQuestion(null)} onCancel={() => setEditingQuestion(null)} />}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {filteredQuestions.length === 0 && !error && <p>No questions found!</p>}
      <p>Showing {filteredQuestions.length} of {questions.length} questions</p>

      <div className="questionList">
        <ol>
          {filteredQuestions.map((q) => (
            <li key={q.id} className="questionItem">
              <strong>{isHTML(q.question) ? parse(q.question) : q.question}</strong> ({q.type})
              <small> - {q.timestamp ? new Date(q.timestamp).toLocaleString() : "No Time"}</small>
              <div>{q.questionImage && (<img src={q.questionImage} alt="Question" style={{ maxWidth: "300px" }} />)}</div>
              {q.type === "MCQ" && Array.isArray(q.options) && (
                <ul>
                  {q.options.map((opt, idx) => (
                    <li key={idx}>{opt.text} {opt.image && (<img src={opt.image} alt={`Option ${idx + 1}`} style={{ maxWidth: "100px" }} />)}</li>
                  ))}
                </ul>
              )}
              {q.correctAnswer && (
                <p><strong>Correct Answer:</strong> {q.correctAnswer.text} {q.correctAnswer.image && (<img src={q.correctAnswer.image} alt="Answer" style={{ maxWidth: "100px" }} />)}</p>
              )}
              
              <button className="editButton" onClick={() => handleEdit(q)}>Edit</button>
              <button className="deleteButton" onClick={() => handleDelete(q)}>Delete</button>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default AllQuestions;
