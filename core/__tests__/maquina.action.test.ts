import { runSafeQuery } from '@/database/runSafeQuery';
import { getMaquinas, startAgregarMaquina, startDeleteMaquina, startPutMaquina } from '../actions/maquina.action';

jest.mock('@/database/runSafeQuery');

const mockRunSafeQuery = runSafeQuery as jest.Mock;

describe('maquina.actions', () => {
  let mockDb: any;

  beforeEach(() => {
    mockDb = {
      getAllAsync: jest.fn(),
      runAsync: jest.fn(),
    };
    mockRunSafeQuery.mockImplementation(async (callback: any) => {
      return callback(mockDb);
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('obtener máquinas', () => {
    it('debería obtener las máquinas', async () => {
      const mockData = [{ id: 1, descripcion: 'Mq 1' }];
      mockDb.getAllAsync.mockResolvedValue(mockData);

      const result = await getMaquinas();
      expect(mockDb.getAllAsync).toHaveBeenCalledWith(expect.stringContaining('SELECT'));
      expect(result).toEqual(mockData);
    });
  });

  describe('iniciarAgregarMaquina', () => {
    it('debería agregar una máquina', async () => {
      mockDb.runAsync.mockResolvedValue(true);
      const newMq: any = { descripcion: 'Desc', marca: 'Brand', modelo: 'Model', anio: 2020 };

      const result = await startAgregarMaquina(newMq);
      expect(mockDb.runAsync).toHaveBeenCalledWith(expect.stringContaining('INSERT INTO maquinas'));
      expect(result.ok).toBe(true);
    });
  });

  describe('iniciarActualizarMaquina', () => {
    it('debería actualizar la máquina', async () => {
      mockDb.runAsync.mockResolvedValue(true);
      const updateMq: any = { id: 1, descripcion: 'Updated' };

      const result = await startPutMaquina(updateMq);
      expect(mockDb.runAsync).toHaveBeenCalledWith(expect.stringContaining('UPDATE maquinas'), expect.anything());
      expect(result.ok).toBe(true);
    });
  });

  describe('iniciarEliminarMaquina', () => {
    it('debería eliminar la máquina', async () => {
      mockDb.runAsync.mockResolvedValue({ changes: 1 });
      const result = await startDeleteMaquina(1);
      expect(result.ok).toBe(true);
    });

    it('debería fallar si no se encuentra', async () => {
      mockDb.runAsync.mockResolvedValue({ changes: 0 });
      const result = await startDeleteMaquina(1);
      expect(result.ok).toBe(false);
    });
  });
});
