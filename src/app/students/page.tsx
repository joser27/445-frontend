"use client";
import { useEffect, useState } from "react";

export default function StudentsPage() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/v1/students");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setStudents(data);
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };

    fetchStudents();
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-6 font-sans bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
        Students
      </h1>
      {students.map((student) => (
        <div
          key={student.id}
          className="bg-white rounded-lg p-6 mb-4 shadow-md"
        >
          <p className="mb-2 text-gray-700">
            <strong>Name:</strong> {student.name}
          </p>
          <p className="mb-2 text-gray-700">
            <strong>Email:</strong> {student.email}
          </p>
          <p className="mb-2 text-gray-700">
            <strong>Age:</strong> {student.age}
          </p>
          <p className="mb-2 text-gray-700">
            <strong>Date of Birth:</strong>{" "}
            {new Date(student.dob).toLocaleDateString()}
          </p>
        </div>
      ))}
    </div>
  );
}
