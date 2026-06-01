/// <reference types="jest" />
import { HeroService } from '../../src/services/hero.service';
import { HeroRepository } from '../../src/repositories/hero.repository';
import { AppError } from '../../src/middlewares/error.middleware';

jest.mock('../../src/repositories/hero.repository', () => ({
  HeroRepository: {
    create: jest.fn(),
    save: jest.fn(),
    findOneBy: jest.fn(),
    remove: jest.fn(),
    findPaginated: jest.fn(),
  },
}));

describe('HeroService', () => {
  let service: HeroService;

  beforeEach(() => {
    service = new HeroService();
    jest.clearAllMocks();
  });

  // Teste 1 — criação sem campos obrigatórios
  it('deve lançar erro ao criar herói sem name', async () => {
    await expect(
      service.create({ nickname: 'Hulk' } as any)
    ).rejects.toThrow('name e nickname são obrigatórios');
  });

  // Teste 2 — criação sem nickname
  it('deve lançar erro ao criar herói sem nickname', async () => {
    await expect(
      service.create({ name: 'Bruce Banner' } as any)
    ).rejects.toThrow('name e nickname são obrigatórios');
  });

  // Teste 3 — editar herói inativo
  it('não deve permitir editar herói inativo', async () => {
    (HeroRepository.findOneBy as jest.Mock).mockResolvedValue({
      id: '123',
      name: 'Bruce Banner',
      nickname: 'Hulk',
      is_active: false,
    });

    await expect(
      service.update('123', { name: 'Novo Nome' })
    ).rejects.toThrow(AppError);
  });

  // Teste 4 — herói não encontrado
  it('deve lançar erro ao buscar herói inexistente', async () => {
    (HeroRepository.findOneBy as jest.Mock).mockResolvedValue(null);

    await expect(
      service.findOne('id-que-nao-existe')
    ).rejects.toThrow('Herói não encontrado');
  });

  // Teste 5 — criação com sucesso
  it('deve criar herói com sucesso', async () => {
    const heroMock = {
      id: 'uuid-123',
      name: 'Bruce Banner',
      nickname: 'Hulk',
      is_active: true,
    };

    (HeroRepository.create as jest.Mock).mockReturnValue(heroMock);
    (HeroRepository.save as jest.Mock).mockResolvedValue(heroMock);

    const result = await service.create({
      name: 'Bruce Banner',
      nickname: 'Hulk',
    });

    expect(result).toEqual(heroMock);
    expect(HeroRepository.create).toHaveBeenCalledWith({
      name: 'Bruce Banner',
      nickname: 'Hulk',
    });
  });
});