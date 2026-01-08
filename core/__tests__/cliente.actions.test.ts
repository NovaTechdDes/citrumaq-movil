import { runSafeQuery } from '@/database/runSafeQuery';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getClientes, startAgregarCliente, startDeleteCliente, startPutCliente } from '../actions/cliente.actions';

jest.mock('@/database/runSafeQuery');
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
}));

const mockRunSafeQuery = runSafeQuery as jest.Mock;

describe('cliente.actions', () => {
  let mockDb: any;

  beforeEach(() => {
    mockDb = {
      getAllAsync: jest.fn(),
      runAsync: jest.fn(),
    };
    mockRunSafeQuery.mockImplementation(async (callback: any) => {
      return callback(mockDb);
    });
    (AsyncStorage.getItem as jest.Mock).mockResolvedValue('123'); // Seller ID
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getClientes', () => {
    it('debería retornar los clientes', async () => {
      const mockResult = [{ id: 1, denominacion: 'Client 1' }];
      mockDb.getAllAsync.mockResolvedValue(mockResult);

      const result = await getClientes();

      expect(mockDb.getAllAsync).toHaveBeenCalledWith(expect.stringContaining('SELECT c.*'));
      expect(result).toEqual(mockResult);
    });

    it('debería retornar un array vacío si ocurre un error', async () => {
      mockRunSafeQuery.mockRejectedValue(new Error('DB Error'));

      const result = await getClientes();

      expect(result).toEqual([]);
    });

    // NOTE: getClientes catches error itself inside implementation?
    // Looking at implementation:
    // try { return runSafeQuery(...) } catch { return [] }
    // If runSafeQuery throws, it returns [].
  });

  describe('startAgregarCliente', () => {
    it('debería agregar un cliente correctamente', async () => {
      mockDb.runAsync.mockResolvedValue(true); // Assuming 'res' is truthy on success

      const newClient: any = {
        denominacion: 'New Client',
        domicilio: 'Address',
        telefono: '555',
        documento: '111',
        localidad: 'Loc',
        observacion_cliente: 'Obs',
      };

      const result = await startAgregarCliente(newClient);

      expect(mockDb.runAsync).toHaveBeenCalledWith(expect.stringContaining('INSERT INTO clientes'));
      expect(result).toEqual({ ok: true, message: 'Cliente agregado correctamente' });
    });

    it('debería manejar el error en runAsync', async () => {
      mockDb.runAsync.mockResolvedValue(false);

      const newClient: any = { denominacion: 'Test' };
      const result = await startAgregarCliente(newClient);

      expect(result).toEqual({ ok: false, message: 'Error al agregar el cliente' });
    });
  });

  describe('startDeleteCliente', () => {
    it('debería eliminar el cliente correctamente', async () => {
      mockDb.runAsync.mockResolvedValue(true);
      // The implementation checks 'res', assume truthy means success or object
      // Actually implementation: if (res) ...

      const result = await startDeleteCliente(1);
      expect(mockDb.runAsync).toHaveBeenCalledWith('DELETE FROM clientes WHERE id = $id', { $id: 1 });
      expect(result).toEqual({ ok: true, message: 'Cliente eliminado correctamente' });
    });
  });

  describe('iniciarActualizarCliente', () => {
    it('debería actualizar el cliente correctamente', async () => {
      mockDb.runAsync.mockResolvedValue(true);
      const clientToUpdate: any = { id: 1, denominacion: 'Updated' };

      const result = await startPutCliente(clientToUpdate);

      expect(mockDb.runAsync).toHaveBeenCalledWith(expect.stringContaining('UPDATE clientes SET'), expect.objectContaining({ $id: 1 }));
      expect(result).toEqual({ ok: true, message: 'cliente cargado con exito' });
    });
  });
});
