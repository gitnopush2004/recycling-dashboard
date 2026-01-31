import { useState } from "react";
import { Card, Group, Text, Badge, Modal, Button } from "@mantine/core";

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
      <Card shadow="xl" radius="xl" withBorder p="lg" style={{ maxWidth: 250 }}>
        <Group position="apart" mb="xs">
          <Text fw={600}>{candidate.name}</Text>
          <Badge color="blue" variant="light" radius="xl">
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

      {/* Modal with custom Copy button */}
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Candidate Profile"
        closeButtonProps={{ display: "none" }} // ✅ hides the default X
      >
        <Text><strong>Name:</strong> {candidate.name}</Text>
        <Text><strong>Experience:</strong> {candidate.experience} yrs</Text>
        <Text><strong>Skills:</strong> {professionalSkills.join(", ")}</Text>
        <Text><strong>Total Score:</strong> {candidate.total_score}</Text>

        {/* Custom Copy button */}
        <Button mt="md" color="teal" radius="xl" onClick={handleCopy}>
          Copy
        </Button>
      </Modal>
    </>
  );
}
