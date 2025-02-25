// Função para permitir o drop de tarefas entre as colunas
function allowDrop(event) {
    event.preventDefault();  // Impede o comportamento padrão de não permitir o drop
}

// Função para realizar o "drag" das tarefas
function drag(event) {
    // Armazena o ID da tarefa que está sendo arrastada
    event.dataTransfer.setData("text", event.target.id);
}

// Função para fazer o "drop" das tarefas nas colunas
function drop(event) {
    event.preventDefault();  // Impede o comportamento padrão

    // Obtém o ID da tarefa que está sendo arrastada
    var data = event.dataTransfer.getData("text");
    var task = document.getElementById(data);

    // Verifica se o drop foi feito dentro de uma área de tarefas
    var dropTarget = event.target.closest('.kanban-tasks');

    if (dropTarget && dropTarget !== task.parentNode) {
        // Adiciona a tarefa à nova coluna
        dropTarget.appendChild(task);
    }
}

// Função para adicionar tarefas
function addTask(columnId) {
    var inputField = document.getElementById(`${columnId}-input`);
    var taskName = inputField.value.trim();
    if (taskName === "") return;

    var taskContainer = document.getElementById(`${columnId}-tasks`);
    var newTask = document.createElement("div");
    newTask.classList.add("task");
    newTask.setAttribute("draggable", "true");
    newTask.setAttribute("id", `task-${new Date().getTime()}`);  // Gera um id único para cada tarefa
    newTask.setAttribute("ondragstart", "drag(event)");

    // Criando o conteúdo da tarefa
    newTask.innerText = taskName;

    // Adicionando evento de clique para remoção e renomeação
    newTask.onclick = function() {
        var newName = prompt("Renomear Tarefa:", newTask.innerText);
        if (newName) newTask.innerText = newName;
    };

    // Adicionando o evento de remover tarefa
    newTask.addEventListener("dblclick", function() {
        if (confirm("Deseja remover esta tarefa?")) {
            newTask.remove();
        }
    });

    // Adicionando a nova tarefa na coluna correspondente
    taskContainer.appendChild(newTask);
    inputField.value = ""; // Limpar campo de entrada
}
