
# 🌐 Tour Virtual - Cantinho da Meimei

Projeto de TCC - Engenharia da Computação  
Faculdade Engenheiro Salvador Arena (FESA) - São Bernardo do Campo, São Paulo

Autores:  
Bruna dos Santos Freitas  
Carlos Baroni Piolla  
Guilherme Silveira Cavinato  
Thiago Cardoso Hanna  

Orientador:  
Prof. Dr. Israel Florentino  

Este repositório apresenta um tour virtual em 360° desenvolvido para o abrigo **Cantinho da Meimei**, com o objetivo de proporcionar uma experiência imersiva de visita remota, promovendo visibilidade institucional, captação de recursos e valorização da história do local.

---

## 🧠 Objetivo

Construir uma aplicação web interativa, leve e acessível que permite aos usuários explorarem os ambientes do abrigo por meio de imagens panorâmicas, pontos de interesse fixos e transições suaves.

---

## 🛠️ Tecnologias Utilizadas

- **Three.js** – Renderização 3D no navegador
- **JavaScript (ES6+)** – Lógica do tour e interação
- **HTML/CSS** – Estrutura da página e estilização
- **GitHub Pages** – Hospedagem gratuita do site estático
- **OpenCV** – Pré-processamento e costura de imagens equiretangulares

---

## ✨ Funcionalidades

- Navegação em 360° com projeção **esférica** e **cilíndrica**
- Pontos de interesse (POIs) fixos, com ícones informativos, vídeos e navegação
- Feedback visual ao passar o mouse nos POIs
- Transições suaves entre ambientes com fade-in e carregamento condicional
- Otimização para dispositivos móveis
- Interface leve, responsiva e de fácil compreensão

---

## 📁 Estrutura do Projeto

```
📁 images/               # Imagens panorâmicas e ícones dos POIs

📁 js/                   # Scripts principais do projeto
 ├── controls.js        # Configuração dos controles de câmera e interação
 ├── main.js            # Inicialização da cena principal e fluxo geral
 ├── pois.js            # Criação e lógica dos pontos de interesse (POIs)
 ├── scenes.js          # Definições de cada ambiente do tour
 └── utils.js           # Funções auxiliares e efeitos visuais

📄 index.html            # Página principal do tour virtual
```

---

## 🚀 Como Executar Localmente

1. Clone este repositório:
```bash
git clone https://github.com/tourvirtualmeimei/tour-virtual.git
```

2. Abra o arquivo `index.html` diretamente no navegador, ou hospede localmente com um servidor estático, como:

```bash
# Com Python 3.x
cd tour-virtual
python -m http.server
```

3. Acesse via navegador:
```
http://localhost:8000
```

---

## 🌍 Acesso Online

Acesse o tour virtual hospedado no GitHub Pages:  
🔗 [https://tourvirtualmeimei.github.io/tour/](https://tourvirtualmeimei.github.io/tour/)

---

## ❤️ Sobre o Projeto

Este projeto foi desenvolvido com foco social, visando ajudar o **Cantinho da Meimei** a divulgar suas instalações de forma moderna, acolhedora e acessível. Ele pode ser adaptado facilmente para outros espaços, como escolas, museus, universidades ou ONGs.

---

## 📌 Licença

Este projeto é de código aberto e gratuito para uso educacional e social. Para usos comerciais, entre em contato com os autores.
