"use client";
import { useState, useEffect } from "react";
import axios from "axios";

export default function useEducationData() {
  const [education, setEducation] = useState([]);

  useEffect(() => {
    axios
      .get(
        "https://raw.githubusercontent.com/FakhirAhmedKhan/DataApi-main/refs/heads/main/Data/educationData.json"
      )
      .then((res) => {
        const data = res.data?.educationData || [];
        setEducation(data);
      })
      .catch((err) => {
        console.error("Error fetching Education:", err);
      });
  }, []);

  return education; // ✅ return the fetched data
}
