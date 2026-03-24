-- Tech Stack Seeder
-- Icons use devicon paths (prefixed with https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/ on the frontend)

INSERT INTO tech_stack (name, icon, color, category, sort_order) VALUES
-- Languages
('Java', 'java/java-original.svg', '#E76F00', 'Languages', 1),
('JavaScript', 'javascript/javascript-original.svg', '#F7DF1E', 'Languages', 2),
('TypeScript', 'typescript/typescript-original.svg', '#3178C6', 'Languages', 3),
('HTML5', 'html5/html5-original.svg', '#E34F26', 'Languages', 4),
('CSS3', 'css3/css3-original.svg', '#1572B6', 'Languages', 5),
('PHP', 'php/php-original.svg', '#777BB4', 'Languages', 6),

-- Frameworks
('React', 'react/react-original.svg', '#61DAFB', 'Frameworks', 1),
('React Native', 'react/react-original.svg', '#61DAFB', 'Frameworks', 2),
('Vue.js', 'vuejs/vuejs-original.svg', '#4FC08D', 'Frameworks', 3),
('Laravel', 'laravel/laravel-original.svg', '#FF2D20', 'Frameworks', 4),
('Spring Boot', 'spring/spring-original.svg', '#6DB33F', 'Frameworks', 5),
('Node.js', 'nodejs/nodejs-original.svg', '#339933', 'Frameworks', 6),
('Expo', 'expo/expo-original.svg', '#000020', 'Frameworks', 7),

-- Databases
('MySQL', 'mysql/mysql-original.svg', '#4479A1', 'Databases', 1),
('MariaDB', 'mariadb/mariadb-original.svg', '#003545', 'Databases', 2),
('Supabase', 'supabase/supabase-original.svg', '#3ECF8E', 'Databases', 3),
('Knex.js', 'knexjs/knexjs-original.svg', '#E16426', 'Databases', 4),
('Prisma', 'prisma/prisma-original.svg', '#2D3748', 'Databases', 5);
