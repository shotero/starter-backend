INSERT INTO users (id, email, pub_key)
    VALUES ('f227f0b7-681b-4d41-b5cf-164fba49dc48', 'test@test.com', 'MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAPCyGvGDlWG/czPXw3vJO7tsreXX9FNT8J5m6JtyfxN6OPzZlt4aj+aag32/WSdrrOInQal5BJP7O+Kkc+sOEccCAwEAAQ==');

INSERT INTO forum.forums (id, name)
    VALUES ('f6f1503d-2346-499a-b601-26093743c1bd', 'alumni'),
    ('52bc4157-f30c-4f23-8c07-9d23bf66e996', 'work');

INSERT INTO forum.threads (id, title, forum_id, body, created_by)
    VALUES ('c20b878c-9ad4-4262-8513-836c1fec7059', 'Please introduce yourself', 'f6f1503d-2346-499a-b601-26093743c1bd', 'Please state your name, batch number and id number', 'f227f0b7-681b-4d41-b5cf-164fba49dc48'),
    ('11843485-15df-41a9-95c3-3384655092e8', 'General rules', 'f6f1503d-2346-499a-b601-26093743c1bd', 'Please be respectful', 'f227f0b7-681b-4d41-b5cf-164fba49dc48');

INSERT INTO forum.posts (thread_id, body, created_by)
    VALUES ('c20b878c-9ad4-4262-8513-836c1fec7059', 'Alex, 342, AX434', 'f227f0b7-681b-4d41-b5cf-164fba49dc48');

-- MIIBOgIBAAJBAPCyGvGDlWG/czPXw3vJO7tsreXX9FNT8J5m6JtyfxN6OPzZlt4aj+aag32/WSdrrOInQal5BJP7O+Kkc+sOEccCAwEAAQJBAJ1c5E6oJ58LiycG1pB0pS/JQvw1L1DXXUZCo6sVtU0mY66W/UwV3zSavQQXUvR9lZziRnmSU0ORPYQ+VvbuLrECIQD+/+Eo/wmJxHOHa3nJSho7pDISp/LkYiKX3nfWYOub2QIhAPGj2+mSc4iqtiFCXEWOxViKJHWrkolKiXBeIYTfzLafAiAm5MhnBF9kD/6/DPmKZi8SIb0xc0Rs6Tr1hw0oOag2IQIgL4ioTf49M/lA8rH3LMe1EoG6QluJ6+/5sV0TAuxzfMkCICbR0JabW4WP88e05Fa/ekFB4PwS+mh5aLN4oq4kcIrk
