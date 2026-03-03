-- flyway:transactional=false

CREATE EXTENSION IF NOT EXISTS provsql CASCADE;

ALTER ROLE postgres 
SET search_path TO public, provsql, postgres;

DO $$
BEGIN
  PERFORM provsql.add_provenance('sim');
  PERFORM provsql.add_provenance('sinan');
END
$$;

CREATE VIEW sim_prov AS SELECT provsql as value, provsql as provenance FROM sim;

CREATE VIEW sinan_prov AS SELECT provsql as value, provsql as provenance FROM sinan;
