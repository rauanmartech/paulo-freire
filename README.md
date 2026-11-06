# Matemática ENEM 2025 — Cursinho Popular Paulo Freire

Plataforma estática com as questões 136 a 180 do caderno 5 (amarelo), 2º dia do ENEM 2025. A questão 178 consta como anulada no gabarito fornecido.

## Abrir no navegador

Abra `dist/index.html` diretamente no navegador. Não há instalação ou servidor obrigatório. O progresso é salvo no armazenamento local do navegador.

Para servir em rede local, execute na pasta do projeto:

```powershell
python -m http.server 8765 --directory dist
```

Depois abra `http://localhost:8765/`.

## Atualizar os recortes

O script `scripts/extrair_questoes.py` lê os dois PDFs na pasta acima do projeto, recorta as 45 questões e gera `dist/questoes-data.js` e `dist/questoes.json`. Requer `PyMuPDF` e `Pillow`.

O site usa apenas `logo-fundo-transparente.png`; a logo original com fundo branco não é utilizada.
