import { runSafeQuery } from '@/database/runSafeQuery';
import { startAgregarLocalidad, startEliminarLocalidad, startModificarLocalidad, startObtenerLocalidades } from '../actions/localidad.actions';

jest.mock('@/database/runSafeQuery');

const mockRunSafeQuery = runSafeQuery as jest.Mock;

describe('localidad.actions', () => {
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

  describe('startObtenerLocalidades', () => {
    it('debería retornar la lista de localidades', async () => {
      const mockData = [{ id_loc: 1, nombre_loc: 'Loc 1' }];
      mockDb.getAllAsync.mockResolvedValue(mockData);

      const result = await startObtenerLocalidades();
      expect(mockDb.getAllAsync).toHaveBeenCalledWith('SELECT * FROM localidad');
      expect(result).toEqual(mockData);
    });
  });

  describe('startAgregarLocalidad', () => {
    it('debería agregar una localidad', async () => {
      mockDb.runAsync.mockResolvedValue({ changes: 1 });
      const result = await startAgregarLocalidad({ nombre_loc: 'New Loc' } as any);

      expect(mockDb.runAsync).toHaveBeenCalledWith(expect.stringContaining('INSERT INTO'), expect.anything());
      expect(result.ok).toBe(true);
    });

    it('debería fallar si no hay cambios', async () => {
      mockDb.runAsync.mockResolvedValue({ changes: 0 });
      const result = await startAgregarLocalidad({ nombre_loc: 'New Loc' } as any);

      expect(result.ok).toBe(false);
    });
  });

  describe('startModificarLocalidad', () => {
    it('debería actualizar la localidad', async () => {
      mockDb.runAsync.mockResolvedValue({ changes: 1 });
      const result = await startModificarLocalidad({ id_loc: 1, nombre_loc: 'Update' } as any);
      expect(result.ok).toBe(true);
    });
  });

  describe('startEliminarLocalidad', () => {
    it('debería eliminar la localidad', async () => {
      mockDb.runAsync.mockResolvedValue({ changes: 1 });
      const result = await startEliminarLocalidad(1);
      expect(result.ok).toBe(true);
    });

    it('debería manejar el fallo', async () => {
      mockDb.runAsync.mockResolvedValue({ changes: 0 });
      const result = await startEliminarLocalidad(1);
      expect(result.ok).toBe(false);
    });
  });
});
