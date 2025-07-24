DROP TABLE IF EXISTS ratings;
DROP TABLE IF EXISTS notes;

-- Create ratings table for storing individual note ratings
CREATE TABLE ratings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    note_id INT NOT NULL,
    user_id INT NOT NULL,
    rating TINYINT(1) NOT NULL CHECK (rating >= 1 AND rating <= 5),
    review TEXT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE KEY unique_user_note_rating (user_id, note_id)
);

-- Create notes table for storing uploaded notes
CREATE TABLE notes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    subject VARCHAR(100) NOT NULL,
    description TEXT,
    file_name VARCHAR(255) NOT NULL,
    file_path VARCHAR(255) NOT NULL,
    file_size INT NOT NULL,
    file_type VARCHAR(50),
    tags JSON,
    downloads INT DEFAULT 0,
    rating_id INT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Add foreign key constraints
ALTER TABLE ratings ADD CONSTRAINT fk_ratings_note_id 
    FOREIGN KEY (note_id) REFERENCES notes(id) ON DELETE CASCADE;

ALTER TABLE notes ADD CONSTRAINT fk_notes_rating_id 
    FOREIGN KEY (rating_id) REFERENCES ratings(id) ON DELETE SET NULL;

-- Create indexes for better performance
CREATE INDEX idx_ratings_note_id ON ratings(note_id);
CREATE INDEX idx_ratings_user_id ON ratings(user_id);
CREATE INDEX idx_ratings_created_at ON ratings(created_at);

CREATE INDEX idx_notes_user_id ON notes(user_id);
CREATE INDEX idx_notes_subject ON notes(subject);
CREATE INDEX idx_notes_created_at ON notes(created_at);
CREATE INDEX idx_notes_rating_id ON notes(rating_id);

-- Create view for notes with calculated rating statistics
CREATE VIEW notes_with_ratings AS
SELECT 
    n.*,
    COALESCE(AVG(r.rating), 0) as average_rating,
    COUNT(r.id) as rating_count,
    GROUP_CONCAT(DISTINCT CONCAT(r.user_id, ':', r.rating) ORDER BY r.created_at DESC) as recent_ratings,
    -- Data dari rating yang direferensikan (featured rating)
    fr.rating as featured_rating_value,
    fr.review as featured_rating_review,
    fr.user_id as featured_rating_user_id,
    fr.created_at as featured_rating_date
FROM notes n
LEFT JOIN ratings r ON n.id = r.note_id
LEFT JOIN ratings fr ON n.rating_id = fr.id
GROUP BY n.id;

-- Create view untuk mendapatkan notes dengan detail lengkap termasuk featured rating
CREATE VIEW notes_complete AS
SELECT 
    n.id,
    n.user_id,
    n.title,
    n.subject,
    n.description,
    n.file_name,
    n.file_path,
    n.file_size,
    n.file_type,
    n.tags,
    n.downloads,
    n.created_at,
    n.updated_at,
    -- Featured rating details
    n.rating_id,
    fr.rating as featured_rating,
    fr.review as featured_review,
    fr.user_id as featured_reviewer_id,
    -- Statistics
    COALESCE(AVG(all_r.rating), 0) as average_rating,
    COUNT(all_r.id) as total_ratings
FROM notes n
LEFT JOIN ratings fr ON n.rating_id = fr.id
LEFT JOIN ratings all_r ON n.id = all_r.note_id
GROUP BY n.id;

-- Insert sample data for testing
INSERT INTO notes (user_id, title, subject, description, file_name, file_path, file_size, file_type, tags, rating_id) VALUES
(5, 'Introduction to Calculus', 'Matematika', 'Comprehensive guide to differential and integral calculus', 'calculus_intro.pdf', '/uploads/calculus_intro.pdf', 2048576, 'pdf', '["calculus", "mathematics", "derivatives", "integrals"]', NULL),
(6, 'Database Design Principles', 'Computer Science', 'Best practices for designing relational databases', 'db_design.docx', '/uploads/db_design.docx', 1536000, 'docx', '["database", "sql", "design", "normalization"]', NULL),
(2, 'Organic Chemistry Basics', 'Kimia', 'Fundamental concepts in organic chemistry', 'organic_chem.pdf', '/uploads/organic_chem.pdf', 3072000, 'pdf', '["chemistry", "organic", "molecules", "reactions"]', NULL);

-- Insert sample ratings
INSERT INTO ratings (note_id, user_id, rating, review) VALUES
(1, 9, 5, 'Excellent explanation of calculus concepts!'),
(1, 9, 4, 'Very helpful, could use more examples'),
(2, 9, 5, 'Great database design guide');

-- Update notes with their primary/featured rating (contoh: rating terbaik untuk setiap note)
UPDATE notes SET rating_id = 7 WHERE id = 1;
UPDATE notes SET rating_id = 8 WHERE id = 2;
