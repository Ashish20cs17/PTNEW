import { database } from "../firebase/FirebaseSetup";
import { ref, push, set, serverTimestamp, get, runTransaction } from "firebase/database";
import supabase from "../supabase/SupabaseConfig";
import { ToastContainer, toast } from "react-toastify";
import React, { useState, useRef, useEffect } from 'react';
import JoditEditor from 'jodit-react';
import "./Upload.css";
import DynamicMathSelector from '../DynamicMathSelector';
// Add this to your imports
import * as XLSX from 'xlsx';


const Upload = () => {
  const [questionType, setQuestionType] = useState("MCQ");
  const [question, setQuestion] = useState("");
  const editor = useRef(null);
  const [questionImage, setQuestionImage] = useState(null);
  const [questionImageUrl, setQuestionImageUrl] = useState(null);
  const [options, setOptions] = useState(["", "", "", ""]);
  const [optionImages, setOptionImages] = useState([null, null, null, null]);
  const [optionImageUrls, setOptionImageUrls] = useState([null, null, null, null]);
  const [mcqAnswer, setMcqAnswer] = useState("");
  const [mcqAnswerImage, setMcqAnswerImage] = useState(null);
  const [mcqAnswerImageUrl, setMcqAnswerImageUrl] = useState(null);
  const [answer, setAnswer] = useState("");
  const [answerImage, setAnswerImage] = useState(null);
  const [answerImageUrl, setAnswerImageUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [questionID, setQuestionID] = useState("");
  const [grade, setGrade] = useState("");
  const [topic, setTopic] = useState("");
  const [topicList, setTopicList] = useState("");
  const [difficultyLevel, setDifficultyLevel] = useState("");
  // Add this state to your component
const [bulkLoading, setBulkLoading] = useState(false);
const [bulkError, setBulkError] = useState(null);
const [uploadProgress, setUploadProgress] = useState(0);
const [uploaderName, setUploaderName] = useState(localStorage.getItem("username") || "");


useEffect(() => {
  if (!localStorage.getItem("username")) {
    const name = prompt("Enter your name:");
    if (name) {
      localStorage.setItem("username", name);
      setUploaderName(name);
    }
  }
}, []);



  const config = {
    readonly: false,
    toolbar: true,
    placeholder: "Enter your question here...",
    enter: "BR",
    removeButtons: "source",
    fullpage: false,
    cleanHTML: true,
    sanitize: true,
    askBeforePasteHTML: false,
  };

  const handleTextChange = (content) => {
    setQuestion(content);
  };

  const uploadImageToSupabase = async (file) => {
    if (!file) return null;
    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const { data, error } = await supabase.storage.from("questions").upload(fileName, file);
    return error ? null : supabase.storage.from("questions").getPublicUrl(fileName).data.publicUrl;
  };

  const deleteImageFromSupabase = async (imageUrl) => {
    if (!imageUrl) return;
    const fileName = imageUrl.split("/").pop();
    await supabase.storage.from("questions").remove([fileName]);
  };

  const handleQuestionImageChange = async (e) => {
    const file = e.target.files[0];
    if (questionImageUrl) await deleteImageFromSupabase(questionImageUrl);
    const url = await uploadImageToSupabase(file);
    setQuestionImage(file);
    setQuestionImageUrl(url);
  };

  const handleOptionImageChange = async (e, index) => {
    const file = e.target.files[0];
    if (optionImageUrls[index]) await deleteImageFromSupabase(optionImageUrls[index]);
    const url = await uploadImageToSupabase(file);
    const newOptionImages = [...optionImages];
    const newOptionImageUrls = [...optionImageUrls];
    newOptionImages[index] = file;
    newOptionImageUrls[index] = url;
    setOptionImages(newOptionImages);
    setOptionImageUrls(newOptionImageUrls);
  };

  const handleMcqAnswerImageChange = async (e) => {
    const file = e.target.files[0];
    if (mcqAnswerImageUrl) await deleteImageFromSupabase(mcqAnswerImageUrl);
    const url = await uploadImageToSupabase(file);
    setMcqAnswerImage(file);
    setMcqAnswerImageUrl(url);
  };

  const handleAnswerImageChange = async (e) => {
    const file = e.target.files[0];
    if (answerImageUrl) await deleteImageFromSupabase(answerImageUrl);
    const url = await uploadImageToSupabase(file);
    setAnswerImage(file);
    setAnswerImageUrl(url);
  };




const handleExcelUpload = async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  try {
    const reader = new FileReader();
    reader.onload = async (event) => {
      const data = new Uint8Array(event.target.result);
      const workbook = XLSX.read(data, { type: "array" });

      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);
for (const row of jsonData) {
const newQuestion = {
  question: row.Question || "",
  options: row.Options ? JSON.parse(row.Options) : [],
  correctAnswer: { text: row.CorrectAnswer || "" },
  grade: String(row.Grade || ""),
  topic: row.Topic || "",
  topicList: [],
  difficultyLevel: row.Difficulty || "",
  questionType: row.Type || "MCQ", // for frontend edit
  type: row.Type || "MCQ",         // for backend/filtering
  timestamp: Date.now(),
  date: new Date().toISOString().split("T")[0],
};


  const newRef = push(ref(database, "questions"));
  await set(newRef, newQuestion);
}



      toast.success("Questions uploaded from Excel successfully");
    };

    reader.readAsArrayBuffer(file);
  } catch (err) {
    console.error("Excel Upload Error:", err);
    toast.error("Failed to upload Excel file");
  }
};
  const getNextQuestionID = async (grade, topic, topicList) => {
    if (!grade || !topic || !topicList) {
      console.log("getNextQuestionID: Missing grade, topic, or topicList");
      return "";
    }
  
    const topicLetter = topic.split(grade)[1];
    const subtopicNum = topicList.split('.')[1];
    const baseID = `${grade}${topicLetter}_${subtopicNum}`; // e.g., "G1A_2"
    const questionIDsRef = ref(database, "questionIDs");
  
    try {
      const snapshot = await get(questionIDsRef);
      let sequence = 1;
      let newQuestionID = `${baseID}_${sequence}`; // e.g., "G1A_2_1"
  
      if (snapshot.exists()) {
        const existingIDs = snapshot.val();
        while (existingIDs[newQuestionID]) {
          sequence++;
          newQuestionID = `${baseID}_${sequence}`;
        }
      }
  
      return newQuestionID;
    } catch (err) {
      console.error("getNextQuestionID: Error:", err);
      setError("Failed to generate question ID: " + err.message);
      return "";
    }
  };

  const reserveQuestionID = async (questionID, firebaseKey) => {
    const questionIDRef = ref(database, `questionIDs/${questionID}`);
    console.log("reserveQuestionID: Attempting to reserve:", questionID, "with key:", firebaseKey);

    try {
      const { committed, snapshot } = await runTransaction(questionIDRef, (currentValue) => {
        console.log("reserveQuestionID: Current value at", questionID, ":", currentValue);
        if (currentValue === null) {
          console.log("reserveQuestionID: Value is null, setting to", firebaseKey);
          return firebaseKey;
        }
        console.log("reserveQuestionID: Value exists, aborting transaction");
        return undefined; // Abort transaction by returning undefined
      });

      console.log("reserveQuestionID: Transaction committed:", committed, "Snapshot:", snapshot?.val());

      if (!committed) {
        throw new Error("Question ID reservation failed - already taken");
      }
      return true;
    } catch (err) {
      console.error("reserveQuestionID: Error:", err);
      throw err;
    }
  };

  useEffect(() => {
    const updateQuestionID = async () => {
      console.log("useEffect: Updating questionID with grade:", grade, "topic:", topic, "topicList:", topicList);
      if (grade && topic && topicList) {
        const newID = await getNextQuestionID(grade, topic, topicList);
        setQuestionID(newID);
      } else {
        setQuestionID("");
      }
    };
    updateQuestionID();
  }, [grade, topic, topicList]);

const uploadQuestion = async () => {
  console.log("uploadQuestion: Starting upload process");
  const uploader = uploaderName || "Anonymous";


  if (!question && !questionImageUrl) {
    setError("Please enter a question or upload an image");
    console.log("uploadQuestion: Validation failed - no question or image");
    return;
  }

  if (questionType !== "TRIVIA" && (!grade || !topic || !topicList || !difficultyLevel)) {
    setError("Please select grade, topic, subtopic, and difficulty");
    console.log("uploadQuestion: Validation failed - missing selections");
    return;
  }

  if (questionType !== "TRIVIA" && !questionID) {
    setError("Question ID not generated");
    console.log("uploadQuestion: Validation failed - no questionID");
    return;
  }

  // ✅ Validation for uploader (optional)
  if (!uploader) {
    setError("Uploader information missing");
    console.log("uploadQuestion: Validation failed - missing uploader");
    return;
  }

  setError(null);
  setLoading(true);
  console.log("uploadQuestion: Validation passed, proceeding with upload");

  try {
    const questionsRef = ref(database, "questions");
    const newQuestionRef = push(questionsRef);
    const firebaseKey = newQuestionRef.key;
    console.log("uploadQuestion: Generated Firebase key:", firebaseKey);

    if (questionType !== "TRIVIA") {
      console.log("uploadQuestion: Using questionID:", questionID);
      await reserveQuestionID(questionID, firebaseKey);
      console.log("uploadQuestion: Question ID reserved successfully");
    }

    const today = new Date().toISOString().split("T")[0];

    console.log("uploadQuestion: Starting upload process");


let questionData = {
  question,
  questionImage: questionImageUrl || null,
  timestamp: Date.now(),
  type: questionType,
  uploader, // ✅ Save uploader to Firebase
};



      if (questionType !== "TRIVIA") {
        questionData = {
          ...questionData,
          questionID,
          topic,
          topicList,
          difficultyLevel,
          grade,
          options: questionType === "MCQ" ? options.map((opt, i) => ({ text: opt, image: optionImageUrls[i] })) : [],
          correctAnswer: questionType === "MCQ"
            ? { text: mcqAnswer, image: mcqAnswerImageUrl }
            : { text: answer, image: answerImageUrl },
        };
      }

      // Save the question
      console.log("uploadQuestion: Saving question data:", questionData);
      await set(newQuestionRef, questionData);
      console.log("uploadQuestion: Question saved successfully");

      // Reset form
      setQuestion("");
      setQuestionImage(null);
      setQuestionImageUrl(null);
      setOptions(["", "", "", ""]);
      setOptionImages([null, null, null, null]);
      setOptionImageUrls([null, null, null, null]);
      setMcqAnswer("");
      setMcqAnswerImage(null);
      setMcqAnswerImageUrl(null);
      setAnswer("");
      setAnswerImage(null);
      setAnswerImageUrl(null);
      setQuestionID("");
      setGrade("");
      setTopic("");
      setTopicList("");
      setDifficultyLevel("");

      setLoading(false);
      toast("Question uploaded successfully");
      console.log("uploadQuestion: Upload complete, form reset");
    } catch (error) {
      setError("Failed to upload question: " + error.message);
      setLoading(false);
      console.error("uploadQuestion: Error:", error);
    }
  };
  return (
    <div className="uploadContainer">
      {/* Grade, Topic Selector */}
      {questionType !== "TRIVIA" && (
        <>
          <DynamicMathSelector
            grade={grade}
            setGrade={setGrade}
            topic={topic}
            setTopic={setTopic}
            topicList={topicList}
            setTopicList={setTopicList}
          />
  
          {/* Difficulty Level */}
          <div className="formGroup">
            <label>Difficulty Level:</label>
            <select value={difficultyLevel} onChange={(e) => setDifficultyLevel(e.target.value)}>
              <option value="">Select Difficulty</option>
              <option value="L1">L1</option>
              <option value="L2">L2</option>
              <option value="L3">L3</option>
              <option value="Br">Br</option>
            </select>
          </div>
  
          {/* Question ID */}
          <div className="formGroup">
            <label>Question ID:</label>
            <input
              type="text"
              value={questionID || "Select grade, topic, and subtopic to generate ID"}
              disabled
            />
          </div>
        </>
      )}
  <div className="formGroup">
  <label>Question Type:</label>
  <div className="circleRadioGroup horizontalRadioGroup">
    <label className="circleRadio">
      <input
        type="radio"
        value="MCQ"
        checked={questionType === "MCQ"}
        onChange={(e) => setQuestionType(e.target.value)}
      />
      <span className="customCircle"></span>
      MCQ
    </label>

    <label className="circleRadio">
      <input
        type="radio"
        value="FILL_IN_THE_BLANKS"
        checked={questionType === "FILL_IN_THE_BLANKS"}
        onChange={(e) => setQuestionType(e.target.value)}
      />
      <span className="customCircle"></span>
      Fill in the Blanks
    </label>

    <label className="circleRadio">
      <input
        type="radio"
        value="TRIVIA"
        checked={questionType === "TRIVIA"}
        onChange={(e) => setQuestionType(e.target.value)}
      />
      <span className="customCircle"></span>
      Trivia
    </label>
  </div>
</div>

<div>
  <label>Upload Excel File (for bulk questions):</label>
  <input type="file" accept=".xlsx, .xls" onChange={handleExcelUpload} />
</div>

      {/* Question Text */}
      <div className="formGroup">
        <label>Question:</label>
        <JoditEditor
          ref={editor}
          value={question}
          config={config}
          onBlur={handleTextChange}
        />
      </div>
  
      {/* Question Image Upload */}
      <div className="formGroup">
        <div className="imageUpload">
          <input type="file" accept="image/*" onChange={handleQuestionImageChange} />
          {questionImageUrl && <div className="imagePreview">Image uploaded</div>}
        </div>
      </div>
  
      {error && <p className="errorMessage">{error}</p>}
  
      {/* MCQ Options */}
      {questionType === "MCQ" && (
        <div className="optionsSection">
          {options.map((option, index) => (
            <div key={index} className="optionContainer">
              <input
                type="text"
                placeholder={`Option ${index + 1}`}
                value={option}
                onChange={(e) => {
                  const updatedOptions = [...options];
                  updatedOptions[index] = e.target.value;
                  setOptions(updatedOptions);
                }}
              />
              <div className="imageUpload">
                <input type="file" accept="image/*" onChange={(e) => handleOptionImageChange(e, index)} />
                {optionImageUrls[index] && <div className="imagePreview">Image uploaded</div>}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Answer Section */}
      {questionType !== "TRIVIA" && (
        <div className="answerSection">
          {questionType === "MCQ" ? (
            <div className="answerContainer">
              <input
                type="text"
                placeholder="Correct Answer"
                value={mcqAnswer}
                onChange={(e) => setMcqAnswer(e.target.value)}
              />
              <div className="imageUpload">
                <input type="file" accept="image/*" onChange={handleMcqAnswerImageChange} />
                {mcqAnswerImageUrl && <div className="imagePreview">Image uploaded</div>}
              </div>
            </div>
          ) : (
            <div className="answerContainer">
              <input
                type="text"
                placeholder="Correct Answer"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
              />
              <div className="imageUpload">
                <input type="file" accept="image/*" onChange={handleAnswerImageChange} />
                {answerImageUrl && <div className="imagePreview">Image uploaded</div>}
              </div>
            </div>
          )}
        </div>
      )}
  
      {/* Upload Button */}
      <button
        className="uploadButton"
        onClick={uploadQuestion}
        disabled={loading}
      >
        {loading ? "Uploading..." : "Upload Question"}
      </button>
  
      <ToastContainer />
    </div>
  );
};
export default Upload;
