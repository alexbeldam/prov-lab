import { SIM_SCHEMA, SINAN_SCHEMA } from '../definitions/schemas.js';

export async function up(pgm) {
	const isProvSQL = process.env.MIGRATION_MODE === 'provsql';

	if (isProvSQL) {
		pgm.sql('CREATE EXTENSION IF NOT EXISTS provsql CASCADE;');
	}

	pgm.createTable('sim', {
		id: 'id',
		...SIM_SCHEMA,
	});

	pgm.createTable('sinan', {
		id: 'id',
		...SINAN_SCHEMA,
	});

	if (isProvSQL) {
		pgm.sql("SELECT provsql.add_provenance('sim');");
		pgm.sql("SELECT provsql.add_provenance('sinan');");

		pgm.sql(
			'CREATE VIEW sim_prov AS SELECT provsql as value, provsql as provenance FROM sim;',
		);
		pgm.sql(
			'CREATE VIEW sinan_prov AS SELECT provsql as value, provsql as provenance FROM sinan;',
		);
	}
}

export async function down(pgm) {
	pgm.sql('DROP VIEW IF EXISTS sim_prov, sinan_prov;');
	pgm.dropTable('sim', { ifExists: true });
	pgm.dropTable('sinan', { ifExists: true });
}
