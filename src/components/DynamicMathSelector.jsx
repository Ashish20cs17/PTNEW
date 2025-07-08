import React from 'react';

const MATH_DATA = {
  grades: [
    { code: "G1", text: "Grade 1" },
    { code: "G2", text: "Grade 2" },
    { code: "G3", text: "Grade 3" },
    { code: "G4", text: "Grade 4" },
  ],
  topics: [
    { grade: "G1", code: "G1A", text: "Number System" },
    { grade: "G2", code: "G2A", text: "Number System" },
    { grade: "G3", code: "G3A", text: "Number System" },
    { grade: "G4", code: "G4A", text: "Number System" },
    { grade: "G1", code: "G1B", text: "Operations (Addition, Subtraction ....)" },
    { grade: "G2", code: "G2B", text: "Operations (Addition, Subtraction ....)" },
    { grade: "G3", code: "G3B", text: "Operations (Addition, Subtraction ....)" },
    { grade: "G4", code: "G4B", text: "Operations (Addition, Subtraction ....)" },
    { grade: "G1", code: "G1C", text: "Shapes and Geometry" },
    { grade: "G2", code: "G2C", text: "Shapes and Geometry" },
    { grade: "G3", code: "G3C", text: "Shapes and Geometry" },
    { grade: "G4", code: "G4C", text: "Shapes and Geometry" },
    { grade: "G1", code: "G1D", text: "Measurement" },
    { grade: "G2", code: "G2D", text: "Measurement" },
    { grade: "G3", code: "G3D", text: "Measurement" },
    { grade: "G4", code: "G4D", text: "Measurement" },
    { grade: "G1", code: "G1E", text: "Data Handling" },
    { grade: "G2", code: "G2E", text: "Data Handling" },
    { grade: "G3", code: "G3E", text: "Data Handling" },
    { grade: "G4", code: "G4E", text: "Data Handling" },
    { grade: "G1", code: "G1F", text: "Maths Puzzles" },
    { grade: "G2", code: "G2F", text: "Maths Puzzles" },
    { grade: "G3", code: "G3F", text: "Maths Puzzles" },
    { grade: "G4", code: "G4F", text: "Maths Puzzles" },
    { grade: "G1", code: "G1G", text: "Real Life all concept sums" },
    { grade: "G2", code: "G2G", text: "Real Life all concept sums" },
    { grade: "G3", code: "G3G", text: "Real Life all concept sums" },
    { grade: "G4", code: "G4G", text: "Real Life all concept sums" },
    { grade: "G1", code: "G1Z", text: "Others" },
    { grade: "G2", code: "G2Z", text: "Others" },
    { grade: "G3", code: "G3Z", text: "Others" },
    { grade: "G4", code: "G4Z", text: "Others" },
  ],
  subtopics: {
    G1A: { G1: [
      { code: "G1A.1", text: "Place Value & Number Names" },
      { code: "G1A.2", text: "Skip Counting" },
      { code: "G1A.3", text: "Comparing & Ordering Numbers" },
      { code: "G1A.4", text: "Ordinal Numbers" },
      { code: "G1A.5", text: "Number Patterns" },
      { code: "G1A.6", text: "Addition & Subtraction of Larger Numbers" },
      { code: "G1A.7", text: "Understanding Zero" },
      { code: "G1A.8", text: "Expanded & Standard Form" },
      { code: "G1A.1000", text: "Others" },
    ]},
    G2A: { G2: [
      { code: "G2A.1", text: "Place Value & Number Names" },
      { code: "G2A.2", text: "Skip Counting" },
      { code: "G2A.3", text: "Comparing & Ordering Numbers" },
      { code: "G2A.4", text: "Ordinal Numbers" },
      { code: "G2A.5", text: "Number Patterns" },
      { code: "G2A.6", text: "Addition & Subtraction of Larger Numbers" },
      { code: "G2A.7", text: "Understanding the Concept of Zero" },
      { code: "G2A.8", text: "Writing Numbers in Expanded & Standard Form" },
      { code: "G2A.1000", text: "Others" },
    ]},
    G3A: { G3: [
      { code: "G3A.1", text: "Place Value & Number Names" },
      { code: "G3A.2", text: "Skip Counting" },
      { code: "G3A.3", text: "Comparing & Ordering Numbers" },
      { code: "G3A.4", text: "Ordinal Numbers" },
      { code: "G3A.5", text: "Number Patterns" },
      { code: "G3A.6", text: "Addition & Subtraction of Larger Numbers" },
      { code: "G3A.7", text: "Understanding the Concept of Zero" },
      { code: "G3A.8", text: "Writing Numbers in Expanded & Standard Form" },
      { code: "G3A.1000", text: "Others" },
    ]},
    G4A: { G4: [
      { code: "G4A.1", text: "Place Value & Number Names" },
      { code: "G4A.2", text: "Rounding & Estimation" },
      { code: "G4A.3", text: "Roman Numerals" },
      { code: "G4A.4", text: "Factors & Multiples" },
      { code: "G4A.5", text: "Number Patterns" },
      { code: "G4A.6", text: "Negative Numbers (Introduction)" },
      { code: "G4A.7", text: "Even & Odd Properties" },
      { code: "G4A.8", text: "Operations with Larger Numbers" },
      { code: "G4A.1000", text: "Others" },
    ]},
    G1B: { G1: [
      { code: "G1B.1", text: "Addition & Subtraction with Carrying/Borrowing" },
      { code: "G1B.2", text: "Multiplication as Repeated Addition" },
      { code: "G1B.3", text: "Understanding Multiplication Tables" },
      { code: "G1B.4", text: "Simple Division Concepts" },
      { code: "G1B.5", text: "Fact Families" },
      { code: "G1B.6", text: "Properties of Addition and Multiplication" },
      { code: "G1B.1000", text: "Others" },
    ]},
    G2B: { G2: [
      { code: "G2B.1", text: "Addition, Subtraction, Multiplication, Division" },
      { code: "G2B.2", text: "Multiplication as Repeated Addition" },
      { code: "G2B.3", text: "Understanding Multiplication Tables" },
      { code: "G2B.4", text: "Simple Division Concepts" },
      { code: "G2B.5", text: "Fact Families" },
      { code: "G2B.6", text: "Properties of Operations" },
      { code: "G2B.1000", text: "Others" },
    ]},
    G3B: { G3: [
      { code: "G3B.1", text: "Addition, Subtraction, Multiplication, Division" },
      { code: "G3B.2", text: "Multiplication as Repeated Addition" },
      { code: "G3B.3", text: "Division Concepts" },
      { code: "G3B.4", text: "Combined Concepts Addition, Subtraction..." },
      { code: "G3B.5", text: "Fact Families" },
      { code: "G3B.6", text: "Properties of Operations" },
      { code: "G3B.1000", text: "Others" },
    ]},
    G4B: { G4: [
      { code: "G4B.1", text: "Addition & Subtraction (Larger Numbers)" },
      { code: "G4B.2", text: "Multiplication & Division (Advanced)" },
      { code: "G4B.3", text: "Properties of Operations" },
      { code: "G4B.4", text: "Fractions & Decimals Operations" },
      { code: "G4B.5", text: "BODMAS & Order of Operations" },
      { code: "G4B.6", text: "Multiplication & Division of Decimals" },
      { code: "G4B.7", text: "Word Problems & Mixed Operations" },
      { code: "G4B.8", text: "Estimation & Approximation" },
      { code: "G4B.1000", text: "Others" },
    ]},
    G1C: { G1: [
      { code: "G1C.1", text: "Basic 2D Shapes" },
      { code: "G1C.2", text: "Solid Shapes (3D Shapes)" },
      { code: "G1C.3", text: "Symmetry" },
      { code: "G1C.1000", text: "Others" },
    ]},
    G2C: { G2: [
      { code: "G2C.1", text: "Basic 2D Shapes" },
      { code: "G2C.2", text: "Solid Shapes (3D Shapes)" },
      { code: "G2C.3", text: "Symmetry" },
      { code: "G2C.1000", text: "Others" },
    ]},
    G3C: { G3: [
      { code: "G3C.1", text: "Basic 2D Shapes" },
      { code: "G3C.2", text: "Solid Shapes (3D Shapes)" },
      { code: "G3C.3", text: "Symmetry & Transformations" },
      { code: "G3C.1000", text: "Others" },
    ]},
    G4C: { G4: [
      { code: "G4C.1", text: "2D & 3D Shapes" },
      { code: "G4C.2", text: "Symmetry & Transformations" },
      { code: "G4C.3", text: "Perimeter & Area" },
      { code: "G4C.4", text: "Introduction to Volume" },
      { code: "G4C.5", text: "Coordinate Geometry (Introduction)" },
      { code: "G4C.1000", text: "Others" },
    ]},
    G1D: { G1: [
      { code: "G1D.1", text: "Length (cm, m)" },
      { code: "G1D.2", text: "Weight (kg, g)" },
      { code: "G1D.3", text: "Capacity (L, mL)" },
      { code: "G1D.4", text: "Time (Hours, Minutes)" },
      { code: "G1D.5", text: "Money (Coins, Notes)" },
      { code: "G1D.6", text: "Introduction to Calendar (Days, Months, Years)" },
      { code: "G1D.1000", text: "Others" },
    ]},
    G2D: { G2: [
      { code: "G2D.1", text: "Length (cm, m)" },
      { code: "G2D.2", text: "Weight (kg, g)" },
      { code: "G2D.3", text: "Capacity (L, mL)" },
      { code: "G2D.4", text: "Time (Hours, Minutes, Seconds)" },
      { code: "G2D.5", text: "Money (Coins, Notes)" },
      { code: "G2D.6", text: "Introduction to Calendar (Days, Months, Years)" },
      { code: "G2D.1000", text: "Others" },
    ]},
    G3D: { G3: [
      { code: "G3D.1", text: "Length (cm, m, km)" },
      { code: "G3D.2", text: "Weight (kg, g)" },
      { code: "G3D.3", text: "Capacity (L, mL)" },
      { code: "G3D.4", text: "Time (Hours, Minutes, Seconds)" },
      { code: "G3D.5", text: "Money & Transactions" },
      { code: "G3D.1000", text: "Others" },
    ]},
    G4D: { G4: [
      { code: "G4D.1", text: "Length, Weight & Capacity" },
      { code: "G4D.2", text: "Time & Money" },
      { code: "G4D.3", text: "Temperature & Speed" },
      { code: "G4D.4", text: "Measurement Word Problems" },
      { code: "G4D.5", text: "Geometry & Measurement Connection" },
      { code: "G4D.6", text: "Volume Measurement" },
      { code: "G4D.1000", text: "Others" },
    ]},
    G1E: { G1: [
      { code: "G1E.1", text: "Tally Marks" },
      { code: "G1E.2", text: "Pictographs" },
      { code: "G1E.3", text: "Simple Bar Graphs" },
      { code: "G1E.4", text: "Understanding Data Interpretation" },
      { code: "G1E.1000", text: "Others" },
    ]},
    G2E: { G2: [
      { code: "G2E.1", text: "Tally Marks" },
      { code: "G2E.2", text: "Pictographs" },
      { code: "G2E.3", text: "Simple Bar Graphs" },
      { code: "G2E.4", text: "Understanding Data Interpretation" },
      { code: "G2E.1000", text: "Others" },
    ]},
    G3E: { G3: [
      { code: "G3E.1", text: "Tally Marks & Pictographs" },
      { code: "G3E.2", text: "Bar Graphs" },
      { code: "G3E.3", text: "Understanding Data Interpretation" },
      { code: "G3E.1000", text: "Others" },
    ]},
    G4E: { G4: [
      { code: "G4E.1", text: "Collecting and organizing data" },
      { code: "G4E.2", text: "Reading and interpreting bar graphs" },
      { code: "G4E.3", text: "Drawing and labeling bar graphs" },
      { code: "G4E.4", text: "Understanding pie charts" },
      { code: "G4E.5", text: "Drawing pictographs" },
      { code: "G4E.6", text: "Using tables to record data" },
      { code: "G4E.7", text: "Solving word problems using data representation" },
      { code: "G4E.8", text: "Understanding averages (mean, mode, median)" },
      { code: "G4E.1000", text: "Others" },
    ]},
    G1F: { G1: [
      { code: "G1F.1", text: "Odd One Out Challenges" },
      { code: "G1F.2", text: "Visual Puzzles" },
      { code: "G1F.3", text: "Number Series & Patterns" },
      { code: "G1F.4", text: "Magic Squares" },
      { code: "G1F.1000", text: "Others" },
    ]},
    G2F: { G2: [
      { code: "G2F.1", text: "Odd One Out Challenges" },
      { code: "G2F.2", text: "Visual Puzzles" },
      { code: "G2F.3", text: "Number Series & Patterns" },
      { code: "G2F.4", text: "Magic Squares" },
      { code: "G2F.1000", text: "Others" },
    ]},
    G3F: { G3: [
      { code: "G3F.1", text: "Odd One Out Challenges" },
      { code: "G3F.2", text: "Visual Puzzles" },
      { code: "G3F.3", text: "Patterns" },
      { code: "G3F.4", text: "Magic Squares" },
      { code: "G3F.5", text: "Fun Probability & Guessing Games" },
      { code: "G3F.6", text: "Code-Breaking & Math Cyphers" },
      { code: "G3F.7", text: "Math Maze" },
      { code: "G3F.8", text: "Geometry Shapes/Symmetry" },
      { code: "G3F.9", text: "Gridlock Challenge" },
      { code: "G3F.10", text: "Logical Puzzles" },
      { code: "G3F.11", text: "Riddles" },
      { code: "G3F.12", text: "Balance the equations" },
      { code: "G3F.13", text: "Clock and calendar based challenges" },
      { code: "G3F.14", text: "Block Puzzles" },
      { code: "G3F.15", text: "Others" },
      { code: "G3F.1000", text: "Others" },
    ]},
    G4F: { G4: [
      { code: "G4F.1", text: "Odd One Out Challenges" },
      { code: "G4F.2", text: "Visual Puzzles" },
      { code: "G4F.3", text: "Patterns" },
      { code: "G4F.4", text: "Magic Squares" },
      { code: "G4F.5", text: "Fun Probability & Guessing Games" },
      { code: "G4F.6", text: "Code-Breaking & Math Cyphers" },
      { code: "G4F.7", text: "Math Maze" },
      { code: "G4F.8", text: "Geometry Shapes/Symmetry" },
      { code: "G4F.9", text: "Gridlock Challenge" },
      { code: "G4F.10", text: "Logical Puzzles" },
      { code: "G4F.11", text: "Riddles" },
      { code: "G4F.12", text: "Balance the equations" },
      { code: "G4F.13", text: "Clock and calendar based challenges" },
      { code: "G4F.14", text: "Block Puzzles" },
      { code: "G4F.15", text: "Others" },
      { code: "G4F.1000", text: "Others" },
    ]},
    G1G: { G1: [
      { code: "G1G.1", text: "Geography" },
      { code: "G1G.2", text: "History" },
      { code: "G1G.3", text: "Civic Responsibilities" },
      { code: "G1G.4", text: "Discoveries and Inventions" },
      { code: "G1G.5", text: "Science" },
      { code: "G1G.6", text: "Language and Literature" },
      { code: "G1G.7", text: "Economics" },
      { code: "G1G.8", text: "Art and Culture" },
      { code: "G1G.9", text: "Safety" },
      { code: "G1G.10", text: "Environment" },
      { code: "G1G.1000", text: "Others" },
    ]},
    G2G: { G2: [
      { code: "G2G.1", text: "Geography" },
      { code: "G2G.2", text: "History" },
      { code: "G2G.3", text: "Civic Responsibilities" },
      { code: "G2G.4", text: "Discoveries and Inventions" },
      { code: "G2G.5", text: "Science" },
      { code: "G2G.6", text: "Language and Literature" },
      { code: "G2G.7", text: "Economics" },
      { code: "G2G.8", text: "Art and Culture" },
      { code: "G2G.9", text: "Safety" },
      { code: "G2G.10", text: "Environment" },
      { code: "G2G.1000", text: "Others" },
    ]},
    G3G: { G3: [
      { code: "G3G.1", text: "Geography" },
      { code: "G3G.2", text: "History" },
      { code: "G3G.3", text: "Civic Responsibilities" },
      { code: "G3G.4", text: "Discoveries and Inventions" },
      { code: "G3G.5", text: "Science" },
      { code: "G3G.6", text: "Language and Literature" },
      { code: "G3G.7", text: "Economics" },
      { code: "G3G.8", text: "Art and Culture" },
      { code: "G3G.9", text: "Safety" },
      { code: "G3G.10", text: "Environment" },
      { code: "G3G.1000", text: "Others" },
    ]},
    G4G: { G4: [
      { code: "G4G.1", text: "Geography" },
      { code: "G4G.2", text: "History" },
      { code: "G4G.3", text: "Civic Responsibilities" },
      { code: "G4G.4", text: "Discoveries and Inventions" },
      { code: "G4G.5", text: "Science" },
      { code: "G4G.6", text: "Language and Literature" },
      { code: "G4G.7", text: "Economics" },
      { code: "G4G.8", text: "Art and Culture" },
      { code: "G4G.9", text: "Safety" },
      { code: "G4G.10", text: "Environment" },
      { code: "G4G.1000", text: "Others" },
    ]},
    G1Z: { G1: [
      
      { code: "G1Z.1", text: "Geography" },
      { code: "G1Z.2", text: "History" },
      { code: "G1Z.3", text: "Civic Responsibilities" },
      { code: "G1Z.4", text: "Discoveries and Inventions" },
      { code: "G1Z.5", text: "Science" },
      { code: "G1Z.6", text: "Language and Literature" },
      { code: "G1Z.7", text: "Economics" },
      { code: "G1Z.8", text: "Art and Culture" },
      { code: "G1Z.9", text: "Safety" },
      { code: "G1Z.10", text: "Environment" },
      { code: "G1Z.1000", text: "Others" },
      
      
    ]},
    G2Z: { G2: [
      
      { code: "G2Z.1", text: "Geography" },
      { code: "G2Z.2", text: "History" },
      { code: "G2Z.3", text: "Civic Responsibilities" },
      { code: "G2Z.4", text: "Discoveries and Inventions" },
      { code: "G2Z.5", text: "Science" },
      { code: "G2Z.6", text: "Language and Literature" },
      { code: "G2Z.7", text: "Economics" },
      { code: "G2Z.8", text: "Art and Culture" },
      { code: "G2Z.9", text: "Safety" },
      { code: "G2Z.10", text: "Environment" },
      { code: "G2Z.1000", text: "Others" },
      
    ]},
    G3Z: { G3: [
      
      { code: "G3Z.1", text: "Geography" },
      { code: "G3Z.2", text: "History" },
      { code: "G3Z.3", text: "Civic Responsibilities" },
      { code: "G3Z.4", text: "Discoveries and Inventions" },
      { code: "G3Z.5", text: "Science" },
      { code: "G3Z.6", text: "Language and Literature" },
      { code: "G3Z.7", text: "Economics" },
      { code: "G3Z.8", text: "Art and Culture" },
      { code: "G3Z.9", text: "Safety" },
      { code: "G3Z.10", text: "Environment" },
      { code: "G3Z.1000", text: "Others" },
      
    ]},
    G4Z: { G4: [
      
      { code: "G4Z.1", text: "Geography" },
      { code: "G4Z.2", text: "History" },
      { code: "G4Z.3", text: "Civic Responsibilities" },
      { code: "G4Z.4", text: "Discoveries and Inventions" },
      { code: "G4Z.5", text: "Science" },
      { code: "G4Z.6", text: "Language and Literature" },
      { code: "G4Z.7", text: "Economics" },
      { code: "G4Z.8", text: "Art and Culture" },
      { code: "G4Z.9", text: "Safety" },
      { code: "G4Z.10", text: "Environment" },
      { code: "G4G.1000", text: "Others" },
      
    ]},
  },
};

const DynamicMathSelector = ({ grade, setGrade, topic, setTopic, topicList, setTopicList }) => {
const handleGradeChange = (e) => {
  setGrade(e.target.value);
  setTopic("all");
  setTopicList("all");
};

const handleTopicChange = (e) => {
  setTopic(e.target.value);
  setTopicList("all");
};
  const filteredTopics = MATH_DATA.topics.filter((t) => t.grade === grade);

  // Debugging logs
  console.log("Grade:", grade);
  console.log("Topic:", topic);
  console.log("Subtopics available:", MATH_DATA.subtopics[topic]?.[grade]);

  return (
    <div>
      <div className="formGroup">
        <label>Grade:</label>
        <select value={grade} onChange={handleGradeChange}>
          <option value="all">Select Grade</option>
          {MATH_DATA.grades.map((g) => (
            <option key={g.code} value={g.code}>
              {g.text}
            </option>
          ))}
        </select>
      </div>

      {grade && (
        <div className="formGroup">
          <label>Topic:</label>
          <select value={topic} onChange={handleTopicChange}>
            <option value="all">Select Topic</option>
            {filteredTopics.map((t) => (
              <option key={t.code} value={t.code}>
                {t.text}
              </option>
            ))}
          </select>
        </div>
      )}

      {grade && topic && MATH_DATA.subtopics[topic]?.[grade] && (
        <div className="formGroup">
          <label>Subtopic:</label>
          <select value={topicList} onChange={(e) => setTopicList(e.target.value)}>
            <option value="all">Select Subtopic</option>
            {MATH_DATA.subtopics[topic][grade].map((st) => (
              <option key={st.code} value={st.code}>
                {st.text}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
};

export default DynamicMathSelector;