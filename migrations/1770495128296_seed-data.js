import fs from 'fs';
import path from 'path';

export async function up(pgm) {
	const files = ['sim_seed.sql', 'sinan_seed.sql'];

	for (const file of files) {
		const sqlPath = path.resolve('data', file);

		if (fs.existsSync(sqlPath)) {
			const sql = fs.readFileSync(sqlPath, 'utf8');

			pgm.sql(sql);
		} else {
			console.warn(
				`⚠️ Arquivo de seed ${file} não encontrado em /data. Pulando...`,
			);
		}
	}
}

export async function down(pgm) {
	pgm.sql('TRUNCATE TABLE sim, sinan RESTART IDENTITY CASCADE;');
}
