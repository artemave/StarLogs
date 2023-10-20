import { crawlContainer } from './domRefs.js'

export default function performCrawl(messages) {
  messages.forEach((message, index) => {
    const block = document.createElement('div');
    block.classList.add('block');
    block.innerText = message;

    if (index === 0) {
      block.style.paddingTop = `${crawlContainer.clientHeight}px`;
    }
    if (index === messages.length - 1) {
      block.style.paddingBottom = '10000px';
    }

    crawlContainer.appendChild(block);
  });

  const scroll = () => {
    crawlContainer.scrollBy({ top: window.innerHeight > 1000 ? 2 : 1 });
    requestAnimationFrame(scroll);
  };
  requestAnimationFrame(scroll);
}

