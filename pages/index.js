import React, { useState } from "react";
import { Button } from "@/components/ui/button.js";
import { Input } from "@/components/ui/Input.js";
import { Card, CardContent } from "@/components/ui/Card.js";

const categories = [
  {
    category: "Legal Compliance",
    weight: 0,
    items: [
      "Located in ERA",
      "Complete and accurate Form SB-1",
      "Public notice and hearing requirements met",
    ],
  },
  {
    category: "Economic Impact",
    weight: 10,
    items: ["Jobs created (quantity & quality)", "Investment amount", "Wage scale"],
  },
  {
    category: "Community Impact",
    weight: 5,
    items: [
      "Supports housing/workforce/community goals",
      "Minor contributions to community goals",
      "No direct community benefit",
    ],
  },
  {
    category: "Duration & Structure",
    weight: 8,
    items: [
      "Appropriate length of abatement",
      "Gradual phase-out schedule",
      "Flexibility for future adjustments",
    ],
  },
  {
    category: "Benchmarks & Transparency",
    weight: 5,
    items: [
      "Commitment to timely reporting",
      "Detail & scope of reporting",
      "Public accessibility of reports",
    ],
  },
  {
    category: "Post-Abatement Benefits",
    weight: 7,
    items: [
      "Sustained tax revenue growth",
      "Job retention & wage stability",
      "Long-term economic impact",
    ],
  },
  {
    category: "Clawback Readiness",
    weight: 5,
    items: [
      "Clawback clause in agreement",
      "Clear performance thresholds",
      "Enforceability of provisions",
    ],
  },
];

export default function TaxAbatementApp() {
  const [inputs, setInputs] = useState({
    taxpayer: "",
    contact: "",
    address: "",
    startDate: "",
    completionDate: "",
    taxDistrict: "",
    scores: {},
  });

  const handleInputChange = (field, value) => {
    setInputs((prev) => ({ ...prev, [field]: value }));
  };

  const handleScoreChange = (category, item, score) => {
    setInputs((prev) => {
      const updatedScores = { ...prev.scores };
      if (!updatedScores[category]) updatedScores[category] = {};
      updatedScores[category][item] = parseInt(score) || 0;
      return { ...prev, scores: updatedScores };
    });
  };

  const calculateScore = () => {
    let total = 0;
    let max = 0;
    categories.forEach(({ category, weight, items }) => {
      items.forEach((item) => {
        const score = inputs.scores[category]?.[item] || 0;
        total += score * weight;
        max += 5 * weight;
      });
    });
    return { total, max, percent: max > 0 ? (total / max) * 100 : 0 };
  };

  const { total, max, percent } = calculateScore();

  return (
    <div className="p-6 space-y-4">
      <Card>
        <CardContent className="space-y-2">
          <h2 className="text-xl font-semibold">Taxpayer Info</h2>
          <Input placeholder="Name of Taxpayer" onChange={(e) => handleInputChange("taxpayer", e.target.value)} />
          <Input placeholder="Contact Person" onChange={(e) => handleInputChange("contact", e.target.value)} />
          <Input placeholder="Address of Property" onChange={(e) => handleInputChange("address", e.target.value)} />
          <Input type="date" placeholder="Planned Start Date" onChange={(e) => handleInputChange("startDate", e.target.value)} />
          <Input type="date" placeholder="Planned Completion Date" onChange={(e) => handleInputChange("completionDate", e.target.value)} />
          <Input placeholder="Tax District" onChange={(e) => handleInputChange("taxDistrict", e.target.value)} />
        </CardContent>
      </Card>

      {categories.map(({ category, weight, items }) => (
        <Card key={category}>
          <CardContent className="space-y-2">
            <h3 className="text-lg font-semibold">{category} (Weight: {weight})</h3>
            {items.map((item) => (
              <div key={item} className="flex items-center justify-between">
                <label>{item}</label>
                <Input
                  type="number"
                  min={0}
                  max={5}
                  onChange={(e) => handleScoreChange(category, item, e.target.value)}
                />
              </div>
            ))}
          </CardContent>
        </Card>
      ))}

      <Card>
        <CardContent>
          <h3 className="text-lg font-semibold">Final Score</h3>
          <p>Total Weighted Score: {total}</p>
          <p>Max Possible Score: {max}</p>
          <p>Score Percentage: {percent.toFixed(2)}%</p>
        </CardContent>
      </Card>

      <Button onClick={() => window.print()}>Export to PDF</Button>
    </div>
  );
}
