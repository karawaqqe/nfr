import { mkdir, writeFile } from 'node:fs/promises';

// Рисую локальные эскизы вместо случайных фотографий. Этот скрипт можно удалить после предметной съёмки.
const shapes = {
  hoodie: '<path d="M188 160 Q165 195 143 202 L66 318 121 354 168 287 157 455 Q300 485 443 455 L432 287 479 354 534 318 457 202 Q435 195 412 160 L369 145 Q300 115 231 145Z"/><path d="M222 154 Q205 70 266 55 Q300 40 334 55 Q395 70 378 154 L343 197 257 197Z"/><path d="M256 152 Q245 86 300 81 Q355 86 344 152 L300 180Z" fill="#111"/><path d="M217 367 L246 330 354 330 383 367 376 412 224 412Z" fill="#272727"/><path d="M269 181 265 271 M331 181 335 271" fill="none" stroke="#aaa" stroke-width="3"/><path d="M163 441 Q300 468 437 441" fill="none" stroke="#555"/>',
  tee: '<path d="M230 111 L175 125 74 217 132 282 182 242 175 460 Q300 478 425 460 L418 242 468 282 526 217 425 125 370 111 Q300 151 230 111Z"/><path d="M230 111 Q300 208 370 111 Q300 160 230 111Z" fill="#111"/><path d="M182 242 175 176 M418 242 425 176 M184 445 416 445" fill="none" stroke="#555"/>',
  pants: '<path d="M191 75 L409 75 423 222 445 482 321 482 300 230 279 482 155 482 177 222Z"/><path d="M191 105 409 105 M300 105 300 230 M196 114 Q192 175 250 168 M404 114 Q408 175 350 168 M169 460 277 460 M323 460 431 460" fill="none" stroke="#777" stroke-width="3"/><path d="M195 287 258 275 M194 295 249 287 M342 336 410 325 M350 345 410 334" stroke="#aaa" stroke-width="4"/><circle cx="300" cy="90" r="5" fill="#bbb"/>',
  jacket: '<path d="M229 107 L165 139 65 339 126 368 177 266 168 462 432 462 423 266 474 368 535 339 435 139 371 107 337 91 263 91Z"/><path d="M263 91 300 160 337 91 371 107 346 200 300 166 254 200 229 107Z" fill="#333"/><path d="M300 166 300 462 M179 423 421 423" stroke="#aaa" stroke-width="3"/><path d="M195 233 267 233 263 297 199 297Z M333 233 405 233 401 297 337 297Z" fill="#333"/><path d="M194 239 268 239 M332 239 406 239" stroke="#888"/><circle cx="230" cy="250" r="3" fill="#ccc"/><circle cx="370" cy="250" r="3" fill="#ccc"/>',
  bag: '<path d="M179 255 Q177 94 300 88 Q423 94 421 255" fill="none" stroke="#333" stroke-width="25"/><path d="M155 239 Q300 202 445 239 L462 416 Q300 460 138 416Z"/><path d="M155 251 Q300 215 445 251 M155 380 Q300 418 445 380" fill="none" stroke="#777" stroke-width="3"/><rect x="270" y="280" width="60" height="55" rx="3" fill="#888"/><rect x="280" y="290" width="40" height="35" fill="#222"/>',
  chain: '<path d="M188 115 C65 420 535 420 412 115" fill="none" stroke="#444" stroke-width="18"/><path d="M188 115 C65 420 535 420 412 115" fill="none" stroke="#b5b5b5" stroke-width="12" stroke-dasharray="3 9"/><path d="M288 322 312 322 312 362 344 362 344 384 312 384 312 461 288 461 288 384 256 384 256 362 288 362Z" fill="url(#metal)" stroke="#777" stroke-width="2"/>',
  ring: '<ellipse cx="300" cy="310" rx="105" ry="125" fill="none" stroke="#333" stroke-width="38"/><ellipse cx="300" cy="300" rx="105" ry="125" fill="none" stroke="url(#metal)" stroke-width="29"/><path d="M248 181 276 143 300 174 324 143 352 181 339 220 261 220Z" fill="url(#metal)" stroke="#555"/><path d="M280 181 300 201 320 181" fill="none" stroke="#333" stroke-width="5"/>',
  belt: '<path d="M130 203 Q295 150 461 221 L442 284 Q294 223 153 273 L136 345 Q300 296 446 355 L460 406 Q290 348 125 398 L100 341Z"/><rect x="108" y="186" width="96" height="100" rx="8" fill="url(#metal)"/><rect x="126" y="203" width="60" height="65" fill="#222"/><path d="M158 204 158 268" stroke="#ccc" stroke-width="5"/><g fill="#aaa"><circle cx="257" cy="218" r="5"/><circle cx="296" cy="220" r="5"/><circle cx="335" cy="225" r="5"/><circle cx="374" cy="235" r="5"/></g>',
};
shapes.sweater = shapes.jacket.replace(/<path d="M263[\s\S]*$/, '<path d="M263 91 Q300 165 337 91" fill="none" stroke="#555" stroke-width="14"/>');
shapes.longsleeve = shapes.sweater;
shapes.cargo = shapes.pants + '<path d="M169 245 253 245 248 330 163 330Z M347 245 431 245 437 330 352 330Z" fill="#333"/><path d="M169 256 253 256 M347 256 431 256" stroke="#888" stroke-width="3"/>';
shapes.denim = shapes.jacket;

const defs = '<defs><linearGradient id="cloth" x1="0" x2="1" y1="0" y2="1"><stop stop-color="#454545"/><stop offset=".4" stop-color="#262626"/><stop offset=".75" stop-color="#353535"/><stop offset="1" stop-color="#171717"/></linearGradient><linearGradient id="metal"><stop stop-color="#555"/><stop offset=".3" stop-color="#e0e0e0"/><stop offset=".55" stop-color="#888"/><stop offset=".8" stop-color="#ddd"/><stop offset="1" stop-color="#555"/></linearGradient></defs>';
const graphic = '<g fill="#b6b6ad"><path d="M300 222 306 247 335 254 307 259 300 291 293 259 265 254 294 247Z"/><text x="300" y="318" text-anchor="middle" font-family="Georgia,serif" font-weight="bold" font-size="30" letter-spacing="5">NFR</text></g>';
await mkdir('public/products', { recursive: true });
for (const [name, shape] of Object.entries(shapes)) { // Создаю общий вид и отдельное приближение детали для галереи.
  const print = ['hoodie', 'tee', 'sweater', 'longsleeve'].includes(name) ? graphic : '';
  for (const detail of [false, true]) {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 560" role="img" aria-label="NFR placeholder sketch">${defs}<g transform="${detail ? 'translate(-180 -130) scale(1.6)' : 'translate(0 10)'}" fill="url(#cloth)" stroke="#222" stroke-width="2" stroke-linejoin="round">${shape}${print}</g></svg>`;
    await writeFile(`public/products/${name}${detail ? '-detail' : ''}.svg`, svg);
  }
}
await writeFile('public/favicon.svg', '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" fill="#111"/><text x="32" y="40" text-anchor="middle" font-family="Georgia,serif" font-weight="bold" font-size="24" fill="white">NFR</text></svg>');
