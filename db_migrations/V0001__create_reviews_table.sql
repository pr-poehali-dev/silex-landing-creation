CREATE TABLE t_p6463740_silex_landing_creati.reviews (
  id SERIAL PRIMARY KEY,
  author VARCHAR(100) NOT NULL,
  company VARCHAR(100),
  role VARCHAR(100),
  text TEXT NOT NULL,
  stars INTEGER NOT NULL CHECK (stars BETWEEN 1 AND 5),
  approved BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW()
);