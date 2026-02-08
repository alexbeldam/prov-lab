export const SIM_SCHEMA = {
	// Identificação e Datas
	tipobito: { type: 'int8' }, // Tipo do óbito: 1: fetal, 2: não fetal
	def_tipo_obito: { type: 'text' }, // Descrição nominal do tipo de óbito
	dtobito: { type: 'text' }, // Data do óbito (ddmmaaaa)
	data_obito: { type: 'date' }, // Data de ocorrência
	ano_obito: { type: 'int8' }, // Ano do óbito
	dia_semana_obito: { type: 'text' }, // Dia da semana do óbito
	natural: { type: 'int8' }, // Naturalidade
	dtnasc: { type: 'text' }, // Data de nascimento (ddmmaaaa)
	data_nasc: { type: 'date' }, // Data de nascimento convertida
	idade_obito_calculado: { type: 'int8' }, // Idade calculada
	ano_nasc: { type: 'int8' }, // Ano de nascimento
	dia_semana_nasc: { type: 'text' }, // Dia da semana do nascimento

	// Demográficos
	idade: { type: 'int4' }, // Idade composta (unidade + valor)
	idade_obito_anos: { type: 'int8' },
	idade_obito_meses: { type: 'int8' },
	idade_obito_dias: { type: 'int8' },
	idade_obito_horas: { type: 'int8' },
	idade_obito_mins: { type: 'int8' },
	sexo: { type: 'int8' }, // 1: Masc, 2: Fem, 0: Ignorado
	def_sexo: { type: 'text' },
	racacor: { type: 'int8' }, // 1 a 5
	def_raca_cor: { type: 'text' },
	estciv: { type: 'int8' }, // Estado civil
	def_est_civil: { type: 'text' },
	esc: { type: 'int8' }, // Escolaridade
	def_escol: { type: 'text' },
	ocup: { type: 'int8' }, // CBO-2002
	codmunres: { type: 'int8' }, // Município de Residência (IBGE)

	// Localidades e Instituições
	lococor: { type: 'int8' }, // Local de ocorrência
	def_loc_ocor: { type: 'text' },
	codmunocor: { type: 'int8' }, // Município de Ocorrência (IBGE)
	idademae: { type: 'int8' },
	escmae: { type: 'int8' },
	def_escol_mae: { type: 'text' },
	ocupmae: { type: 'int8' },
	qtdfilvivo: { type: 'int8' },
	qtdfilmort: { type: 'int8' },
	gravidez: { type: 'int8' },
	def_gravidez: { type: 'text' },
	gestacao: { type: 'int8' },
	def_gestacao: { type: 'text' },
	parto: { type: 'int8' },
	def_parto: { type: 'text' },
	obitoparto: { type: 'int8' },
	def_obito_parto: { type: 'text' },
	peso: { type: 'int8' },

	// Circunstâncias e Causas
	obitograv: { type: 'int8' },
	def_obito_grav: { type: 'text' },
	obitopuerp: { type: 'int8' },
	def_obito_puerp: { type: 'text' },
	assistmed: { type: 'int8' },
	def_assist_med: { type: 'text' },
	exame: { type: 'int8' },
	def_exame: { type: 'text' },
	cirurgia: { type: 'int8' },
	def_cirurgia: { type: 'text' },
	necropsia: { type: 'int8' },
	def_necropsia: { type: 'text' },
	causabas: { type: 'text' }, // CID-10
	linhaa: { type: 'text' },
	linhab: { type: 'text' },
	linhac: { type: 'text' },
	linhad: { type: 'text' },
	linhaii: { type: 'text' },
	circobito: { type: 'int8' }, // 1: Acidente, 2: Suicídio, 3: Homicídio
	def_circ_obito: { type: 'text' },
	acidtrab: { type: 'int8' },
	def_acid_trab: { type: 'text' },
	fonte: { type: 'int8' },
	def_fonte: { type: 'text' },
	origem: { type: 'int8' }, // Coluna que estava faltando
	horaobito: { type: 'text' },
	codmunnatu: { type: 'int8' },

	// Escolaridade e Séries
	esc2010: { type: 'int8' },
	seriescfal: { type: 'int8' },
	codestab: { type: 'text' },
	estabdescr: { type: 'text' },
	escmae2010: { type: 'int8' },
	seriescmae: { type: 'int8' },
	semagestac: { type: 'int8' },
	tpmorteoco: { type: 'int8' },

	// Metadados do Sistema
	cb_pre: { type: 'text' },
	crm: { type: 'int8' },
	comunsvoim: { type: 'int8' },
	dtatestado: { type: 'text' },
	numerolote: { type: 'int8' },
	tppos: { type: 'text' },
	dtinvestig: { type: 'text' },
	causabas_o: { type: 'text' },
	dtcadastro: { type: 'text' },
	atestante: { type: 'int8' },
	stcodifica: { type: 'text' },
	codificado: { type: 'text' },
	versaosist: { type: 'text' },
	versaoscb: { type: 'float8' },
	fonteinv: { type: 'int8' },
	dtrecebim: { type: 'text' },
	atestado: { type: 'text' },
	dtrecoriga: { type: 'text' },
	causamat: { type: 'text' },
	escmaeagr1: { type: 'text' },
	escfalagr1: { type: 'text' },
	stdoepidem: { type: 'int8' },
	stdonova: { type: 'int8' },
	difdata: { type: 'text' },
	nudiasobco: { type: 'text' },
	nudiasobin: { type: 'text' },
	dtcadinv: { type: 'text' },
	tpobitocor: { type: 'int8' },
	dtconinv: { type: 'text' },
	fontes: { type: 'text' },
	tpresginfo: { type: 'int8' },
	tpnivelinv: { type: 'text' },
	nudiasinf: { type: 'text' },
	dtcadinf: { type: 'text' },
	morteparto: { type: 'int8' },
	dtconcaso: { type: 'text' },
	fontesinf: { type: 'text' },
	altcausa: { type: 'int8' },

	// Georreferenciamento de Residência
	res_munnome: { type: 'text' },
	res_munnomex: { type: 'text' },
	res_amazonia: { type: 'text' },
	res_fronteira: { type: 'text' },
	res_capital: { type: 'text' },
	res_msaudcod: { type: 'int8' },
	res_rsaudcod: { type: 'int8' },
	res_csaudcod: { type: 'int8' },
	res_latitude: { type: 'float8' },
	res_longitude: { type: 'float8' },
	res_altitude: { type: 'int8' },
	res_area: { type: 'float8' },
	res_codigo_adotado: { type: 'int8' },

	// Georreferenciamento de Ocorrência
	ocor_munnome: { type: 'text' },
	ocor_munnomex: { type: 'text' },
	ocor_amazonia: { type: 'text' },
	ocor_fronteira: { type: 'text' },
	ocor_capital: { type: 'text' },
	ocor_msaudcod: { type: 'int8' },
	ocor_rsaudcod: { type: 'int8' },
	ocor_csaudcod: { type: 'int8' },
	ocor_latitude: { type: 'float8' },
	ocor_longitude: { type: 'float8' },
	ocor_altitude: { type: 'int8' },
	ocor_area: { type: 'float8' },
	ocor_codigo_adotado: { type: 'int8' },

	// Unidades Federativas e Regiões
	res_sigla_uf: { type: 'text' },
	res_codigo_uf: { type: 'text' },
	res_nome_uf: { type: 'text' },
	ocor_sigla_uf: { type: 'text' },
	ocor_codigo_uf: { type: 'text' },
	ocor_nome_uf: { type: 'text' },
	res_regiao: { type: 'text' },
	ocor_regiao: { type: 'text' },

	// Detalhamento CID-10
	causabas_capitulo: { type: 'text' },
	causabas_grupo: { type: 'text' },
	causabas_categoria: { type: 'text' },
	causabas_subcategoria: { type: 'text' },
	res_coordenadas: { type: 'text' },
	ocor_coordenadas: { type: 'text' },
};

// definitions/schemas.js

export const SINAN_SCHEMA = {
	// 1. Notificação e Agravo
	tp_not: { type: 'int8' }, // Tipo de Notificação (1-Negativa, 2-Individual)
	id_agravo: { type: 'text' }, // Código CID-10
	dt_notific: { type: 'date' }, // Data da Notificação [cite: 9]
	sem_not: { type: 'text' }, // Semana Epidemiológica de Notificação [cite: 9]
	nu_ano: { type: 'int8' }, // Ano da Notificação
	sg_uf_not: { type: 'int8' }, // UF de Notificação [cite: 9]
	id_municip: { type: 'int8' }, // Município de Notificação [cite: 9]
	id_unidade: { type: 'text' }, // Código da Unidade de Saúde [cite: 9]

	// 2. Ocorrência e Identificação do Paciente
	dt_ocor: { type: 'date' }, // Data da ocorrência da violência [cite: 16, 17]
	sem_pri: { type: 'text' }, // Semana Epidemiológica dos primeiros sintomas [cite: 36]
	nm_pacient: { type: 'text' }, // Nome do Paciente [cite: 19, 39]
	dt_nasc: { type: 'date' }, // Data de nascimento [cite: 22, 44]
	ano_nasc: { type: 'int8' }, // Ano de nascimento [cite: 44]
	nu_idade_n: { type: 'int4' }, // Idade (Campo composto) [cite: 53, 85]
	cs_sexo: { type: 'text' }, // Sexo (M/F/I) [cite: 81, 86]
	cs_gestant: { type: 'int8' }, // Gestante [cite: 87]
	cs_raca: { type: 'int8' }, // Raça/Cor [cite: 87]
	cs_escol_n: { type: 'int8' }, // Escolaridade [cite: 89]
	sg_uf: { type: 'text' }, // UF de residência [cite: 90]
	id_mn_resi: { type: 'int8' }, // Município de residência [cite: 90]
	id_pais: { type: 'int8' }, // País de residência [cite: 100, 109]
	nduplic: { type: 'int8' }, // Identifica duplicidade [cite: 115, 120]
	dt_invest: { type: 'date' }, // Data da investigação
	id_ocupa_n: { type: 'text' }, // Ocupação [cite: 126]
	sit_conjug: { type: 'int8' }, // Situação conjugal [cite: 126]

	// 3. Deficiências e Transtornos (1-Sim, 2-Não, 9-Ignorado)
	def_trans: { type: 'int8' }, // Possui deficiência/transtorno [cite: 126]
	def_fisica: { type: 'int8' }, // Deficiência física [cite: 127]
	def_mental: { type: 'int8' }, // Deficiência mental [cite: 127]
	def_visual: { type: 'int8' }, // Deficiência visual [cite: 127]
	def_auditi: { type: 'int8' }, // Deficiência auditiva [cite: 127]
	tran_ment: { type: 'int8' }, // Transtorno mental [cite: 127]
	tran_comp: { type: 'int8' }, // Transtorno de comportamento [cite: 128]
	def_out: { type: 'int8' }, // Outras deficiências [cite: 128]
	def_espec: { type: 'text' }, // Especificar deficiência [cite: 128]

	// 4. Local de Ocorrência
	sg_uf_ocor: { type: 'int8' }, // UF de ocorrência [cite: 128]
	id_mn_ocor: { type: 'int8' }, // Município de ocorrência [cite: 128]
	hora_ocor: { type: 'text' }, // Hora de ocorrência [cite: 131]
	local_ocor: { type: 'int8' }, // Local de ocorrência (01-Residência, 06-Via Pública, etc) [cite: 132]
	local_espe: { type: 'text' }, // Especificar local outro [cite: 132]
	out_vezes: { type: 'int8' }, // Ocorreu outras vezes? [cite: 132]
	les_autop: { type: 'int8' }, // Lesão autoprovocada? [cite: 132]

	// 5. Tipos de Violência e Meios de Agressão
	viol_fisic: { type: 'int8' }, // Violência física [cite: 133]
	viol_psico: { type: 'int8' }, // Violência psicológica [cite: 133]
	viol_tort: { type: 'int8' }, // Tortura [cite: 133]
	viol_sexu: { type: 'int8' }, // Violência sexual [cite: 133]
	viol_traf: { type: 'int8' }, // Tráfico de seres humanos [cite: 133]
	viol_finan: { type: 'int8' }, // Violência financeira [cite: 133]
	viol_negli: { type: 'int8' }, // Negligência/Abandono [cite: 133]
	viol_infan: { type: 'int8' }, // Trabalho infantil [cite: 134]
	viol_legal: { type: 'int8' }, // Intervenção legal [cite: 134]
	viol_outr: { type: 'int8' }, // Outros tipos de violência [cite: 134]
	viol_espec: { type: 'text' }, // Especificar violência [cite: 134]
	ag_forca: { type: 'int8' }, // Força corporal/Espancamento [cite: 134]
	ag_enfor: { type: 'int8' }, // Enforcamento [cite: 134]
	ag_objeto: { type: 'int8' }, // Objeto contundente [cite: 134]
	ag_corte: { type: 'int8' }, // Objeto perfuro-cortante [cite: 135]
	ag_quente: { type: 'int8' }, // Substância/Objeto quente [cite: 135]
	ag_enven: { type: 'int8' }, // Envenenamento [cite: 135]
	ag_fogo: { type: 'int8' }, // Arma de fogo [cite: 135]
	ag_ameaca: { type: 'int8' }, // Ameaça [cite: 135]
	ag_outros: { type: 'int8' }, // Outro meio [cite: 135]
	ag_espec: { type: 'text' }, // Especificar meio [cite: 136]

	// 6. Violência Sexual e Procedimentos
	sex_assedi: { type: 'int8' }, // Assédio sexual [cite: 136]
	sex_estupr: { type: 'int8' }, // Estupro [cite: 136]
	sex_pudor: { type: 'int8' }, // Atentado violento ao pudor [cite: 136]
	sex_porno: { type: 'int8' }, // Pornografia infantil [cite: 136]
	sex_explo: { type: 'int8' }, // Exploração sexual [cite: 137]
	sex_outro: { type: 'int8' }, // Outro tipo de violência sexual [cite: 137]
	sex_espec: { type: 'text' }, // Especificar violência sexual [cite: 137]
	pen_oral: { type: 'int8' }, // Penetração Oral [cite: 137]
	pen_anal: { type: 'int8' }, // Penetração Anal [cite: 137]
	pen_vagina: { type: 'int8' }, // Penetração Vaginal [cite: 138]
	proc_dst: { type: 'int8' }, // Profilaxia DST [cite: 138]
	proc_hiv: { type: 'int8' }, // Profilaxia HIV [cite: 138]
	proc_hepb: { type: 'int8' }, // Profilaxia Hepatite B [cite: 138]
	proc_sang: { type: 'int8' }, // Coleta de sangue [cite: 138]
	proc_semen: { type: 'int8' }, // Coleta de sêmen [cite: 139]
	proc_vagin: { type: 'int8' }, // Coleta de secreção vaginal [cite: 139]
	proc_contr: { type: 'int8' }, // Contracepção de emergência [cite: 139]
	proc_abort: { type: 'int8' }, // Aborto previsto em lei [cite: 139]

	// 7. Consequências e Natureza da Lesão
	cons_abort: { type: 'int8' }, // Aborto (consequência)
	cons_grav: { type: 'int8' }, // Gravidez [cite: 139]
	cons_dst: { type: 'int8' }, // DST [cite: 140]
	cons_suic: { type: 'int8' }, // Tentativa de suicídio [cite: 140]
	cons_ment: { type: 'int8' }, // Transtorno mental [cite: 140]
	cons_comp: { type: 'int8' }, // Transtorno comportamental [cite: 140]
	cons_estre: { type: 'int8' }, // Estresse pós-traumático [cite: 140]
	cons_outr: { type: 'int8' }, // Outras consequências [cite: 141]
	cons_espec: { type: 'text' }, // Especificar consequências [cite: 141]
	lesao_nat: { type: 'int8' }, // Natureza da lesão [cite: 141]
	lesao_espe: { type: 'text' }, // Especificar natureza da lesão [cite: 141]
	lesao_corp: { type: 'int8' }, // Parte do corpo atingida [cite: 142]

	// 8. Autor da Agressão e Relações
	num_envolv: { type: 'int8' }, // Número de envolvidos [cite: 142]
	rel_sexual: { type: 'int8' }, // Tipo de relações sexuais [cite: 126]
	rel_pai: { type: 'int8' }, // Relação: Pai [cite: 142]
	rel_mae: { type: 'int8' }, // Relação: Mãe [cite: 143]
	rel_pad: { type: 'int8' }, // Relação: Padrasto [cite: 143]
	rel_mad: { type: 'int8' }, // Relação: Madrasta [cite: 143]
	rel_conj: { type: 'int8' }, // Relação: Cônjuge [cite: 143]
	rel_excon: { type: 'int8' }, // Relação: Ex-cônjuge [cite: 143]
	rel_namo: { type: 'int8' }, // Relação: Namorado(a) [cite: 143]
	rel_exnam: { type: 'int8' }, // Relação: Ex-namorado(a) [cite: 143]
	rel_filho: { type: 'int8' }, // Relação: Filho(a) [cite: 144]
	rel_desco: { type: 'int8' }, // Relação: Desconhecido [cite: 144]
	rel_irmao: { type: 'int8' }, // Relação: Irmão(ã) [cite: 144]
	rel_conhec: { type: 'int8' }, // Relação: Amigos/Conhecidos [cite: 144]
	rel_cuida: { type: 'int8' }, // Relação: Cuidador [cite: 144]
	rel_patrao: { type: 'int8' }, // Relação: Patrão/Chefe [cite: 144]
	rel_inst: { type: 'int8' }, // Relação: Pessoa com relação institucional [cite: 144]
	rel_pol: { type: 'int8' }, // Relação: Policial/Agente da lei [cite: 145]
	rel_propri: { type: 'int8' }, // Relação: Própria pessoa [cite: 145]
	rel_outros: { type: 'int8' }, // Relação: Outros [cite: 145]
	rel_espec: { type: 'text' }, // Especificar relação [cite: 145]
	autor_sexo: { type: 'int8' }, // Sexo do provável autor [cite: 145]
	autor_alco: { type: 'int8' }, // Suspeita de uso de álcool pelo autor [cite: 145]

	// 9. Encaminhamentos e Desfecho
	enc_saude: { type: 'int8' }, // Encaminhamento setor saúde [cite: 146]
	enc_tutela: { type: 'int8' }, // Conselho tutelar [cite: 146]
	enc_vara: { type: 'int8' }, // Vara da infância/juventude [cite: 146]
	enc_abrigo: { type: 'int8' }, // Casa abrigo [cite: 146]
	enc_sentin: { type: 'int8' }, // Programa sentinela [cite: 146]
	enc_deam: { type: 'int8' }, // DEAM [cite: 147]
	enc_dpca: { type: 'int8' }, // DPCA [cite: 147]
	enc_deleg: { type: 'int8' }, // Outras delegacias [cite: 147]
	enc_mpu: { type: 'int8' }, // Ministério Público [cite: 147]
	enc_mulher: { type: 'int8' }, // Centro de referência da mulher [cite: 147]
	enc_creas: { type: 'int8' }, // CREAS/CRAS [cite: 148]
	enc_iml: { type: 'int8' }, // IML [cite: 148]
	enc_outr: { type: 'int8' }, // Outros encaminhamentos [cite: 148]
	enc_espec: { type: 'text' }, // Especificar outros setores [cite: 148]
	rel_trab: { type: 'int8' }, // Violência relacionada ao trabalho [cite: 148]
	rel_cat: { type: 'int8' }, // Emitida CAT? [cite: 148]
	circ_lesao: { type: 'text' }, // Circunstância da lesão (CID-10 Capítulo XX) [cite: 149]
	classi_fin: { type: 'int8' }, // Classificação final [cite: 149]
	evolucao: { type: 'int8' }, // Evolução do caso (1-Alta, 3-Óbito por violência, etc) [cite: 149]
	dt_obito: { type: 'date' }, // Data do óbito [cite: 149]
	dt_encerra: { type: 'date' }, // Data de encerramento do caso [cite: 149]

	// Não descritos
	dt_digita: { type: 'date' },
	dt_transus: { type: 'date' },
	dt_transdm: { type: 'date' },
	dt_transsm: { type: 'date' },
	dt_transrm: { type: 'date' },
	dt_transrs: { type: 'date' },
	dt_transse: { type: 'date' },
	tpuninot: { type: 'int8' },
	orient_sex: { type: 'int8' },
	ident_gen: { type: 'int8' },
	viol_motiv: { type: 'int8' },
	cicl_vid: { type: 'int8' },
	rede_sau: { type: 'int8' },
	assist_soc: { type: 'int8' },
	rede_educa: { type: 'int8' },
	atend_mulh: { type: 'int8' },
	cons_tutel: { type: 'int8' },
	cons_ido: { type: 'int8' },
	deleg_idos: { type: 'int8' },
	dir_human: { type: 'int8' },
	mpu: { type: 'int8' },
	deleg_cria: { type: 'int8' },
	deleg_mulh: { type: 'int8' },
	deleg: { type: 'int8' },
	infan_juv: { type: 'int8' },
	defen_publ: { type: 'int8' },
};
