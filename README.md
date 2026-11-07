# Matemática ENEM 2025 — Cursinho Popular Paulo Freire

Plataforma estática com as questões 136 a 180 do caderno 5 (amarelo), 2º dia do ENEM 2025. A questão 178 consta como anulada no gabarito fornecido.

Todas as 45 questões têm explicação na plataforma. As 44 questões válidas têm resolução comentada; a questão 178 traz a situação de anulação no gabarito e uma análise algébrica para estudo. As questões 159 e 175 incluem esquemas visuais da função tangente e das tortas cilíndricas.

## Assuntos e dificuldade

Todas as 45 questões têm áreas gerais, tags de assunto e dificuldade sugerida em `dist/classificacoes-data.js`. A classificação também inclui a questão 178, anulada. Na navegação, é possível buscar tags com ou sem acentos, filtrar por área e dificuldade e clicar em uma tag exibida na questão para localizar outras do mesmo assunto.

O filtro e a tag da questão aberta usam verde para fácil, amarelo para médio e vermelho para difícil. Os números na navegação não exibem a dificuldade. Ela é uma estimativa didática, não uma classificação oficial do ENEM: fácil para leitura ou conta direta, médio para duas ou mais etapas ou interpretação de representação, e difícil para modelagem ou combinação de ideias menos imediata. A distribuição é de 15 fáceis, 19 médias e 11 difíceis.

O botão **Sortear questão** escolhe uma questão válida entre as que aparecem no filtro atual. A animação revela primeiro a área, depois a dificuldade e, por fim, o número sorteado. Há um som breve em cada revelação, com controle para desligá-lo; essa preferência fica salva no navegador. O botão final abre a questão. A questão anulada não entra no sorteio.

Na questão 141, arraste o modelo 3D com o mouse ou toque para girar a peça e ver a base inferior. O botão "Voltar à posição inicial" restaura a vista. As setas do teclado também giram o modelo quando ele está em foco.

Na questão 144, a visualização 3D permite girar os três planos, avançar uma casa por vez ou reproduzir os 12 movimentos do cubo. A posição e as projeções são atualizadas a cada casa.
Na questão 151, o modelo 3D da cúpula pentagonal giralongada pode ser girado e destaca os grupos de vértices da base, junção central e topo.
Na questão 160, o mapa animado percorre as ruas do quarteirão P até a casa A, com controles para avançar, voltar e reproduzir a rota.

## Abrir no navegador

Dê um duplo clique em `index.html`, nesta pasta. Ele abre a plataforma em `dist/index.html`. Não há instalação ou servidor obrigatório. O progresso é salvo no armazenamento local do navegador.

Se preferir servir em rede local, execute na pasta do projeto:

```powershell
python -m http.server 8765 --directory dist
```

Depois abra `http://localhost:8765/`.

## Atualizar os recortes

O script `scripts/extrair_questoes.py` lê os dois PDFs na pasta acima do projeto, recorta as 45 questões e gera `dist/questoes-data.js` e `dist/questoes.json`. Requer `PyMuPDF` e `Pillow`.

O site usa apenas `logo-fundo-transparente.png`; a logo original com fundo branco não é utilizada.
