CREATE TABLE candidates (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  experience INT,
  skills VARCHAR(255)
);

CREATE TABLE evaluations (
  id INT AUTO_INCREMENT PRIMARY KEY,
  candidate_id INT,
  crisis_management_score INT,
  sustainability_score INT,
  team_motivation_score INT,
  FOREIGN KEY (candidate_id) REFERENCES candidates(id)
);

CREATE TABLE rankings (
  id INT AUTO_INCREMENT PRIMARY KEY,
  candidate_id INT,
  total_score INT,
  rank_position INT,
  FOREIGN KEY (candidate_id) REFERENCES candidates(id)
);
