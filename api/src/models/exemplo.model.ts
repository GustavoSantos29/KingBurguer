// =================================================================
// 1. IMPORTS
// Geralmente no topo. Usamos 'import type' quando só queremos a "forma"
// de um objeto, e não seus valores, o que é mais performático.
// =================================================================
import type { LancheParaCompraDTO } from './compra.model';

// =================================================================
// 2. INTERFACE (O "Contrato" da Classe)
// É uma boa prática definir um contrato que a classe deve seguir.
// =================================================================
interface IExemplo {
  id: number;
  getFullName(): string;
}

// =================================================================
// 3. EXPORTAÇÃO E DECLARAÇÃO DA CLASSE
// 'export class' permite que ela seja importada em outros arquivos.
// Usamos PascalCase (PrimeiraLetraMaiuscula) para nomes de classes.
// A classe 'implementa' a interface, o que a obriga a ter os campos 'id' e 'getFullName'.
// =================================================================
export class Exemplo implements IExemplo {
  // =================================================================
  // 4. ATRIBUTOS (Propriedades da Classe)
  // Aqui definimos as variáveis que cada instância da classe terá.
  // =================================================================

  // ATRIBUTOS PÚBLICOS: Acessíveis de qualquer lugar.
  public id: number;

  // ATRIBUTOS PRIVADOS: Acessíveis apenas DENTRO desta classe.
  // O '_' no início (_firstName) é uma convenção para indicar que é privado.
  private _firstName: string;
  private _lastName: string;

  // ATRIBUTOS PROTEGIDOS: Acessíveis dentro desta classe e de classes que a herdam.
  protected createdAt: Date;

  // ATRIBUTOS SOMENTE-LEITURA: Só podem ser definidos no construtor.
  public readonly uniqueId: string;

  // ATRIBUTOS ESTÁTICOS: Pertencem à CLASSE, não à instância. É um valor compartilhado.
  public static instanceCount = 0;

  // ATRIBUTOS OPCIONAIS: Podem ou não ter um valor.
  public description?: string;

  // =================================================================
  // 5. CONSTRUTOR
  // Método especial executado quando um novo objeto é criado com 'new Exemplo()'.
  // Usado para inicializar os atributos.
  // =================================================================
  constructor(id: number, firstName: string, lastName: string, description?: string) {
    // Inicialização padrão
    this.id = id;
    this._firstName = firstName;
    this._lastName = lastName;
    this.createdAt = new Date();
    this.uniqueId = `user-${Math.random()}`; // Definindo o atributo readonly

    // Atributo opcional
    if (description) {
      this.description = description;
    }

    // Incrementa o contador estático toda vez que uma nova instância é criada
    Exemplo.instanceCount++;
    console.log(`Existem agora ${Exemplo.instanceCount} instâncias de Exemplo.`);
  }

  // =================================================================
  // 6. GETTERS E SETTERS
  // Permitem controlar o acesso e a modificação de atributos privados.
  // =================================================================

  // GETTER: Permite LER um valor (geralmente privado) como se fosse um atributo.
  public get fullName(): string {
    return `${this._firstName} ${this._lastName}`;
  }

  // SETTER: Permite MODIFICAR um valor (geralmente privado) com validação.
  public set firstName(newName: string) {
    if (newName.length < 2) {
      throw new Error('O nome precisa ter pelo menos 2 caracteres.');
    }
    this._firstName = newName;
  }

  // =================================================================
  // 7. MÉTODOS PÚBLICOS
  // As ações que o objeto pode realizar.
  // =================================================================

  // Método simples, sem parâmetros, que retorna 'void' (nada).
  public helloWorld(): void {
    console.log('Hello, World!');
  }

  // Método público que chama um método privado para fazer algum trabalho interno.
  public getFullName(): string {
    const formattedName = this.formatName(this.fullName);
    return `Nome completo formatado: ${formattedName}`;
  }

  // Método async que retorna uma Promessa com um número.
  public async processSomething(): Promise<number> {
    console.log('Iniciando processamento...');
    // Simula um trabalho que leva 1 segundo
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log('Processamento finalizado.');
    return 42;
  }

  // =================================================================
  // 8. MÉTODOS PRIVADOS E PROTEGIDOS
  // Métodos auxiliares que só podem ser chamados de dentro da classe.
  // =================================================================

  // MÉTODO PRIVADO: Só pode ser chamado por outros métodos DENTRO da classe Exemplo.
  private formatName(name: string): string {
    return name.toUpperCase();
  }

  // =================================================================
  // 9. MÉTODOS ESTÁTICOS
  // Métodos que pertencem à CLASSE, não à instância.
  // Você chama com 'Exemplo.createDefaultUser()', e não 'new Exemplo().createDefaultUser()'.
  // =================================================================
  public static createDefaultUser(): Exemplo {
    // Note que não usamos 'this' aqui, pois não há instância.
    console.log('Criando um usuário padrão...');
    return new Exemplo(0, 'Usuário', 'Padrão', 'Um usuário de teste');
  }
}

// =================================================================
// 10. VARIAÇÃO: CONSTRUTOR COM "PARAMETER PROPERTIES"
// Um atalho do TypeScript para criar e inicializar atributos no construtor.
// Muito comum em projetos reais por ser mais enxuto.
// =================================================================
export class ExemploEnxuto {
  // O TypeScript cria e atribui 'public id' e 'private name' automaticamente
  // apenas por declará-los no construtor.
  constructor(
    public id: number,
    private name: string,
    public readonly type: string = 'default' // Parâmetro com valor padrão
  ) {
    console.log(`ExemploEnxuto criado: ${this.name}`);
  }

  public getName(): string {
    return this.name;
  }
}

// =================================================================
// 11. VARIAÇÃO: EXPORTAÇÃO DEFAULT
// Permite que, ao importar, você possa dar qualquer nome à classe.
// Só pode haver UM 'export default' por arquivo.
// =================================================================
export default class OutroExemplo {
  // ...
}