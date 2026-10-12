function uwuifyText(text) {
  text = text.replace(/[rl]/g, 'w');
  text = text.replace(/[RL]/g, 'W');

  text = text.replace(/n([aeiou])/g, 'ny$1');
  text = text.replace(/N([aeiou])/g, 'Ny$1');
  text = text.replace(/N([AEIOU])/g, 'NY$1');

  text = text.replace(/([.!?]+)(?=\s|$)/g, '$1 nya~');

  return text;
}

function uwuifyElement(rootElement) {
  const walker = document.createTreeWalker(
    rootElement,
    NodeFilter.SHOW_TEXT,
    {
      acceptNode: (node) => {
      if (node.uwufied) {
          return NodeFilter.FILTER_REJECT;
      }

      const parentTag = node.parentElement?.tagName;
        if (['SCRIPT', 'STYLE', 'NOSCRIPT', 'CODE', 'PRE', 'TEXTAREA', 'INPUT'].includes(parentTag)) {
          return NodeFilter.FILTER_REJECT;
        }
        return NodeFilter.FILTER_ACCEPT;
      }
    }
  );

  let currentNode;
  while ((currentNode = walker.nextNode())) {
    currentNode.textContent = uwuifyText(currentNode.textContent);

    currentNode.uwufied = true;
  }
}

uwuifyElement(document.body);

const observer = new MutationObserver((mutationsList) => {
  for (const mutation of mutationsList) {
    if (mutation.type === 'childList') {
      mutation.addedNodes.forEach((node) => {
        if (node.nodeType === Node.ELEMENT_NODE) {
          uwuifyElement(node);
        }
      });
    }
  }
});

observer.observe(document.body, {
  childList: true,
  subtree: true
});
