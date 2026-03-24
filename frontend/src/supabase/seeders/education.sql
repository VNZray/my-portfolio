-- ============================================
-- EDUCATION SEEDER
-- ============================================

INSERT INTO education (institution, degree, field_of_study, start_date, end_date, is_current, achievements, logo_url, is_visible, sort_order)
VALUES
(
    'University of Nueva Caceres',
    'College',
    'BS Information Technology',
    '2022-08-01',
    '2026-06-30',
    TRUE,
    ARRAY[
        'Dean''s Lister: 1st Year (1st & 2nd Sem)',
        'Dean''s Lister: 2nd Year (2nd Sem)',
        'Dean''s Lister: 3rd Year (1st Sem)',
        '4th Year (Ongoing)'
    ],
    NULL,
    TRUE,
    1
),
(
    'United High School Inc.',
    'Senior High School',
    NULL,
    '2020-08-01',
    '2022-06-30',
    FALSE,
    ARRAY['Graduated with Honors'],
    NULL,
    TRUE,
    2
),
(
    'United High School Inc.',
    'High School',
    NULL,
    '2016-08-01',
    '2020-06-30',
    FALSE,
    '{}',
    NULL,
    TRUE,
    3
);
