document.addEventListener('DOMContentLoaded', function() {
  fetch('data.json') // Здесь data.json - имя вашего файла JSON
    .then(response => response.json())
    .then(data => buildTree(data.services, document.getElementById('tree')));
});

function buildTree(services, container) {
  const tree = document.createElement('ul');

  services.sort((a, b) => a.sorthead - b.sorthead);

  services.forEach(service => {
    if (service.head === null) {
      const listItem = document.createElement('li');
      listItem.textContent = `${service.name} (${service.price})`;
      tree.appendChild(listItem);

      if (service.node === 1) {
        buildSubtree(service.id, services, listItem);
      }
    }
  });

  container.appendChild(tree);
}

function buildSubtree(parentId, services, parentElement) {
  const subtree = document.createElement('ul');

      services.filter(service => service.head === parentId).sort((a, b) => a.sorthead - b.sorthead).forEach(service => {
        const listItem = document.createElement('li');
        listItem.textContent = `${service.name} (${service.price})`;
        subtree.appendChild(listItem);

        if (service.node === 1) {
          buildSubtree(service.id, services, listItem);
        }
      });

      parentElement.appendChild(subtree);
    }