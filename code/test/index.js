import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.json({
    message: "Working..",
  });
});

app.get("/todos", (req, res) => {
  const data = [
    {
      id: 101,
      task: "Fix navigation bug",
      description: "The navbar overlaps content on mobile screens.",
      isCompleted: false,
      priority: "High",
      dueDate: "2023-12-25T09:00:00Z",
      tags: ["bug", "development"],
    },
    {
      id: 102,
      task: "Weekly team meeting",
      description: "Discuss Q4 goals and marketing strategy.",
      isCompleted: true,
      priority: "Medium",
      dueDate: "2023-11-15T14:00:00Z",
      tags: ["meeting", "work"],
    },
    {
      id: 103,
      task: "Read 'Clean Code'",
      description: "Read chapter 4 and 5.",
      isCompleted: false,
      priority: "Low",
      dueDate: null,
      tags: ["learning", "personal"],
    },
    {
      id: 104,
      task: "Renew car insurance",
      description: "",
      isCompleted: false,
      priority: "High",
      dueDate: "2023-11-30T00:00:00Z",
      tags: ["finance", "urgent"],
    },
  ];
  res.json(data)
});

app.listen(3000,()=>{
    console.log(`Server is running on 3000`);
    
})