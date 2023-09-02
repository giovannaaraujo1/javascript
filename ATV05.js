const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const alunos = [];

function cadastrarAluno() {
  rl.question('Digite o nome do aluno: ', (nome) => {
    const alunoExistente = alunos.find(a => a.nome === nome);
    if (alunoExistente) {
      console.log('Este aluno já está cadastrado.\n');
    } else {
      alunos.push({ nome, notas: [] });
      console.log('Aluno cadastrado com sucesso!\n');
    }
    menu();
  });
}

function cadastrarNotas() {
  rl.question('Digite o nome do aluno: ', (nome) => {
    const aluno = alunos.find(a => a.nome === nome);
    if (aluno) {
      if (aluno.notas.length === 3) {
        console.log('Este aluno já possui todas as notas cadastradas.\n');
        menu();
      } else {
        cadastrarNota(aluno);
      }
    } else {
      console.log('Aluno não encontrado.\n');
      menu();
    }
  });
}

function cadastrarNota(aluno) {
  rl.question(`Digite a nota ${aluno.notas.length + 1} do aluno ${aluno.nome}: `, (notaInput) => {
    const nota = parseFloat(notaInput);
    if (!isNaN(nota)) {
      aluno.notas.push(Math.round(nota));
      console.log('Nota cadastrada com sucesso!\n');
      if (aluno.notas.length === 3) {
        console.log('Notas cadastradas com sucesso!\n');
        menu();
      } else {
        cadastrarNota(aluno);
      }
    } else {
      console.log('Nota inválida. Por favor, insira um número válido.\n');
      cadastrarNota(aluno);
    }
  });
}

function calcularMedia(notas) {
  const soma = notas.reduce((acc, nota) => acc + nota, 0);
  return Math.round(soma / notas.length);
}

function exibirBoletim() {
  rl.question('Digite o nome do aluno: ', (nome) => {
    const aluno = alunos.find(a => a.nome === nome);
    if (aluno) {
      const media = calcularMedia(aluno.notas);
      let status;
      if (media >= 7) {
        status = 'Aprovado';
      } else if (media >= 5) {
        status = 'Em recuperação';
      } else {
        status = 'Reprovado';
      }
      console.log(`Boletim de ${aluno.nome}:`);
      console.log(`Notas: ${aluno.notas.join(', ')}`);
      console.log(`Média: ${media}`);
      console.log(`Status: ${status}\n`);
    } else {
      console.log('Aluno não encontrado.\n');
    }
    menu();
  });
}

function menu() {
  console.log('Menu de Opções:');
  console.log('1. Cadastrar Aluno');
  console.log('2. Cadastrar Notas');
  console.log('3. Exibir Boletim');
  console.log('4. Sair');
  rl.question('Escolha uma opção: ', (opcao) => {
    switch (opcao) {
      case '1':
        cadastrarAluno();
        break;
      case '2':
        cadastrarNotas();
        break;
      case '3':
        exibirBoletim();
        break;
      case '4':
        rl.close();
        break;
      default:
        console.log('Opção inválida.\n');
        menu();
    }
  });
}

menu();