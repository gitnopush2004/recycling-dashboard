import { useEffect, useState } from "react";
import {
  MantineProvider,
  Paper,
  Title,
  Text,
  Group,
  Card,
  Badge,
  Modal,
  Button,
} from "@mantine/core";
import "./App.css";

function Summary({ total, avg, top }) {
  return (
    <Paper shadow="xl" radius="xl" p="md" withBorder style={{
      background: "linear-gradient(135deg, #ffe6f0, #e6f7ff)",
      borderRadius: "20px",
      boxShadow: "0 6px 16px rgba(0,0,0,0.1)"
    }}>
      <Title order={3}>📊 Summary</Title>
      <Text>Total Candidates: {total}</Text>
      <Text>Average Score: {avg}</Text>
      <Text>Top Performer: {top.name} (Score: {top.total_score})</Text>
    </Paper>
  );
}

function Leaderboard({ rankings }) {
  return (
    <Paper shadow="sm" radius="sm" p="md" withBorder style={{ background: "rgba(255,255,255,0.95)" }}>
      <Title order={3} mb="sm">🏆 Leaderboard</Title>
      <table className="excel-table">
        <thead>
          <tr><th>Rank</th><th>Name</th><th>Total Score</th></tr>
        </thead>
        <tbody>
          {rankings.map((r, i) => (
            <tr key={r.id}>
              <td>{i + 1}</td>
              <td>{r.name}</td>
              <td>
                <span style={{
                  backgroundColor: r.total_score >= 22 ? "#d4edda" : "#f8d7da",
                  color: "#333",
                  padding: "4px 8px",
                  borderRadius: "4px",
                  display: "inline-block"
                }}>
                  {r.total_score}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Paper>
  );
}

function CandidateCard({ candidate }) {
  const [opened, setOpened] = useState(false);
  const professionalSkills = candidate.skillsList || candidate.skills?.split(",") || [];

  const handleCopy = async () => {
    const candidateInfo = `
      Candidate: ${candidate.name}
      Experience: ${candidate.experience} yrs
      Skills: ${professionalSkills.join(", ")}
      Total Score: ${candidate.total_score ?? "N/A"}
    `;
    try {
      await navigator.clipboard.writeText(candidateInfo);
      alert("Candidate info copied to clipboard!");
      setOpened(false); // close modal after copying
    } catch {
      alert("Failed to copy candidate info.");
    }
  };

  return (
    <>
      <Card shadow="xl" radius="xl" withBorder p="lg" style={{
        width: "100%",
        maxWidth: "250px",
        background: "linear-gradient(135deg, #f9f9f9, #e6f7ff)",
        borderRadius: "20px",
        boxShadow: "0 6px 16px rgba(0,0,0,0.1)"
      }}>
        <Group position="apart" mb="xs">
          <Text fw={600} size="md">{candidate.name}</Text>
          <Badge color="blue" variant="light" size="sm" radius="xl">
            {candidate.experience} yrs
          </Badge>
        </Group>

        <Text size="xs" c="dimmed" mb="xs"><strong>Key Skills:</strong></Text>
        <Text size="xs">{professionalSkills.join(", ")}</Text>

        {/* 🔗 Profile Link */}
        <Text
          size="sm"
          mt="md"
          style={{
            cursor: "pointer",
            color: "#0077cc",
            fontWeight: 500,
            textAlign: "center",
            marginBottom: "6px",
            transition: "color 0.2s ease",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#0055aa")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#0077cc")}
          onClick={() => setOpened(true)}
        >
          🔗 Candidate Profile Link
        </Text>
      </Card>

      {/* Modal with Copy button instead of X */}
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Candidate Profile"
        closeButtonProps={{ display: "none" }} // hides the default X
      >
        <Text><strong>Name:</strong> {candidate.name}</Text>
        <Text><strong>Experience:</strong> {candidate.experience} yrs</Text>
        <Text><strong>Skills:</strong> {professionalSkills.join(", ")}</Text>
        <Text><strong>Total Score:</strong> {candidate.total_score}</Text>

        <Button mt="md" color="teal" radius="xl" onClick={handleCopy}>
          Copy
        </Button>
      </Modal>
    </>
  );
}

function SkillHeatmap({ evaluations }) {
  return (
    <Paper shadow="sm" radius="sm" p="md" withBorder style={{ background: "rgba(255,255,255,0.95)" }}>
      <Title order={3} mb="sm">🔥 Skill Heatmap</Title>
      <table className="excel-table">
        <thead>
          <tr><th>Name</th><th>Crisis</th><th>Sustainability</th><th>Motivation</th></tr>
        </thead>
        <tbody>
          {evaluations.map((e) => (
            <tr key={e.id}>
              <td>{e.name}</td>
              <td><Badge color={e.crisis_management_score >= 7 ? "green" : "red"}>{e.crisis_management_score}</Badge></td>
              <td><Badge color={e.sustainability_score >= 7 ? "green" : "red"}>{e.sustainability_score}</Badge></td>
              <td><Badge color={e.team_motivation_score >= 7 ? "green" : "red"}>{e.team_motivation_score}</Badge></td>
            </tr>
          ))}
        </tbody>
      </table>
    </Paper>
  );
}

export default function App() {
  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
    fetch("/candidates.json")
      .then((res) => res.json())
      .then((data) => {
        const sorted = [...data].sort((a, b) => b.total_score - a.total_score);
        setCandidates(sorted);
      });
  }, []);

  if (candidates.length === 0) return <p>Loading...</p>;

  const avgScore = (
    candidates.reduce((sum, c) => sum + c.total_score, 0) / candidates.length
  ).toFixed(1);

  const topCandidate = candidates[0];

  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <div style={{
        position: "absolute",
        top: 0, left: 0, right: 0, bottom: 0,
        padding: "30px",
        background: "linear-gradient(135deg, #d4fc79, #96e6a1, #84fab0, #8fd3f4, #a1c4fd)",
        backgroundSize: "600% 600%",
        animation: "gradientBG 20s ease infinite",
        overflowY: "auto",
        fontFamily: "Inter, Segoe UI, sans-serif"
      }}>
        <style>
          {`
            @keyframes gradientBG {
              0% {background-position: 0% 50%;}
              50% {background-position: 100% 50%;}
              100% {background-position: 0% 50%;}
            }
          `}
        </style>

        <div style={{
          maxWidth: "900px",
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          gap: "24px"
        }}>
          <Title order={1} style={{ textAlign: "center", color: "#333", letterSpacing: "1px", fontWeight: 700 }}>
            ♻️ Recycling Manager Dashboard
          </Title>

          <Summary total={candidates.length} avg={avgScore} top={topCandidate} />

          <Leaderboard rankings={candidates} />

          <Title order={2} style={{ textAlign: "center" }}>🌟 Top 3 Profiles</Title>
          <div style={{ display: "flex", justifyContent: "center", gap: "20px", flexWrap: "wrap" }}>
            {candidates.slice(0, 3).map((c) => (
              <CandidateCard key={c.id} candidate={c} />
            ))}
          </div>

          <SkillHeatmap evaluations={candidates} />
        </div>
      </div>
    </MantineProvider>
  );
}
