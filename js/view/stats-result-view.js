export default (data) => {

  const arr = Array.from(data.values());
  const node = [];
  arr.map((it) => {
    it = `<li class="stats__result stats__result--${it}"></li>`;
    node.push(it);
  });

  return node.join(``);
};
