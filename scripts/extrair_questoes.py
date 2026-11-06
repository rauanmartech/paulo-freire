"""Extrai as 45 questões de Matemática do caderno amarelo do ENEM 2025."""
from pathlib import Path
import json
import re

import pymupdf
from PIL import Image

ROOT = Path(__file__).resolve().parents[2]
DIST = Path(__file__).resolve().parents[1] / 'dist'
IMAGES = DIST / 'questoes'
IMAGES.mkdir(parents=True, exist_ok=True)

booklet = pymupdf.open(ROOT / '2025_PV_impresso_D2_CD5.pdf')
answer_pdf = pymupdf.open(ROOT / '2025_GB_impresso_D2_CD5.pdf')
answer_text = answer_pdf[0].get_text()
answer_key = {int(n): a.upper() for n, a in re.findall(r'(?m)^\s*(1[3-8]\d)\s+([ABCDE]|Anulado)\s*$', answer_text, re.I)}
assert len([n for n in answer_key if 136 <= n <= 180]) == 45, answer_key

full_width_pages = {18, 19, 21, 24, 27, 29}
questions = []
for page_no in range(16, 32):
    page = booklet[page_no - 1]
    headings = []
    for block in page.get_text('blocks'):
        match = re.search(r'QUEST.{0,8}?O\s*(1[3-8]\d)', block[4], re.I)
        if match:
            number = int(match.group(1))
            if 136 <= number <= 180:
                headings.append({'number': number, 'x': block[0], 'y': block[1]})
    for heading in headings:
        number = heading['number']
        is_full = page_no in full_width_pages
        side = 'full' if is_full else ('left' if heading['x'] < 280 else 'right')
        following = [h['y'] for h in headings if h['y'] > heading['y'] + 3 and (is_full or (h['x'] < 280) == (heading['x'] < 280))]
        bottom = min(following) - 5 if following else 744
        left, right = (18, 549) if is_full else ((18, 282) if side == 'left' else (285, 549))
        rect = pymupdf.Rect(left, max(72, heading['y'] - 5), right, bottom)
        pix = page.get_pixmap(matrix=pymupdf.Matrix(2.2, 2.2), clip=rect, alpha=False)
        image = Image.frombytes('RGB', (pix.width, pix.height), pix.samples)
        filename = f'{number}.webp'
        image.save(IMAGES / filename, 'WEBP', quality=88, method=6)
        text = page.get_text(clip=rect).strip()
        text = re.sub(r'(?i)^QUEST.{0,8}?O\s*\d{3}\s*', '', text).strip()
        snippet = re.sub(r'\s+', ' ', text)[:170]
        questions.append({
            'number': number,
            'answer': None if answer_key[number] == 'ANULADO' else answer_key[number],
            'annulled': answer_key[number] == 'ANULADO',
            'image': f'questoes/{filename}',
            'page': page_no,
            'snippet': snippet,
        })

questions.sort(key=lambda question: question['number'])
assert [question['number'] for question in questions] == list(range(136, 181))
assert [question['number'] for question in questions if question['annulled']] == [178]
(DIST / 'questoes.json').write_text(json.dumps(questions, ensure_ascii=False, indent=2), encoding='utf-8')
(DIST / 'questoes-data.js').write_text('window.QUESTOES = ' + json.dumps(questions, ensure_ascii=False) + ';\n', encoding='utf-8')
print(f'{len(questions)} questões extraídas; {sum(p.stat().st_size for p in IMAGES.iterdir()) / 1_000_000:.1f} MB em imagens')
