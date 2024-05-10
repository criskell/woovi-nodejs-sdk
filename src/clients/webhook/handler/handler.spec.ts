import crypto from 'crypto';
import Handle, { verifyPayload, handleWebhooks } from '.';

jest.mock('crypto');
const mockedCrypto = crypto as jest.Mocked<typeof crypto>;

describe('Webhook Utils', () => {
  describe('verifyPayload', () => {
    it('should return true for valid payload', () => {
      const mockVerify = {
        write: jest.fn(),
        end: jest.fn(),
        verify: jest.fn().mockReturnValueOnce(true),
      };

      mockedCrypto.createVerify.mockReturnValueOnce(mockVerify as any);

      const payload = { event: 'OPENPIX:CHARGE_CREATED', data: {} };
      const signature = 'valid_signature';
      const result = verifyPayload({
        payload: JSON.stringify(payload),
        signature,
      });
      expect(result).toBe(true);
    });

    it('should return false for invalid payload', () => {
      const mockVerify = {
        write: jest.fn(),
        end: jest.fn(),
        verify: jest.fn().mockReturnValueOnce(false),
      };

      mockedCrypto.createVerify.mockReturnValueOnce(mockVerify as any);

      const payload = { event: 'OPENPIX:CHARGE_CREATED', data: {} };
      const signature = 'invalid_signature';
      const result = verifyPayload({
        payload: JSON.stringify(payload),
        signature,
      });
      expect(result).toBe(false);
    });
  });

  describe('handleWebhooks', () => {
    it('should return 400 if signature is missing', async () => {
      const req = { headers: new Map() };
      const response = await handleWebhooks({}, req as any);
      expect(response.status).toBe(400);
    });

    it('should return 400 if signature is invalid', async () => {
      const mockVerify = {
        write: jest.fn(),
        end: jest.fn(),
        verify: jest.fn().mockReturnValueOnce(false),
      };

      mockedCrypto.createVerify.mockReturnValueOnce(mockVerify as any);

      const req = {
        headers: new Map([['x-webhook-signature', 'invalid_signature']]),
        json: jest.fn().mockResolvedValue({}),
      };
      const response = await handleWebhooks({}, req as any);
      expect(response.status).toBe(400);
    });

    it('should call the correct handler based on event', async () => {
      const mockVerify = {
        write: jest.fn(),
        end: jest.fn(),
        verify: jest.fn().mockReturnValueOnce(true),
      };

      mockedCrypto.createVerify.mockReturnValueOnce(mockVerify as any);

      const mockHandler = jest
        .fn()
        .mockResolvedValueOnce(new Response('Success', { status: 200 }));
      const config = { onChargeCreated: mockHandler };
      const payload = { event: 'OPENPIX:CHARGE_CREATED', data: {} };
      const req = {
        headers: new Map([['x-webhook-signature', 'valid_signature']]),
        json: jest.fn().mockResolvedValue(payload),
      };
      const response = await handleWebhooks(config, req as any);
      expect(mockHandler).toHaveBeenCalledWith(payload);
      expect(response.status).toBe(200);
    });

    it('should return 404 if event handler is not found', async () => {
      const mockVerify = {
        write: jest.fn(),
        end: jest.fn(),
        verify: jest.fn().mockReturnValueOnce(true),
      };

      mockedCrypto.createVerify.mockReturnValueOnce(mockVerify as any);
      const req = {
        headers: new Map([['x-webhook-signature', 'valid_signature']]),
        json: jest.fn().mockResolvedValue({ event: 'UNKNOWN_EVENT', data: {} }),
      };
      const response = await handleWebhooks({}, req as any);
      expect(response.status).toBe(404);
    });
  });

  describe('handleWebhooks - Default', () => {
    it('should return 400 if signature is missing', async () => {
      const req = { headers: new Map() };
      const response = await Handle({}).POST(req as any);
      expect(response.status).toBe(400);
    });

    it('should return 400 if signature is invalid', async () => {
      const mockVerify = {
        write: jest.fn(),
        end: jest.fn(),
        verify: jest.fn().mockReturnValueOnce(false),
      };

      mockedCrypto.createVerify.mockReturnValueOnce(mockVerify as any);

      const req = {
        headers: new Map([['x-webhook-signature', 'invalid_signature']]),
        json: jest.fn().mockResolvedValue({}),
      };
      const response = await Handle({}).POST(req as any);
      expect(response.status).toBe(400);
    });

    it('should call the correct handler based on event', async () => {
      const mockVerify = {
        write: jest.fn(),
        end: jest.fn(),
        verify: jest.fn().mockReturnValueOnce(true),
      };

      mockedCrypto.createVerify.mockReturnValueOnce(mockVerify as any);

      const mockHandler = jest
        .fn()
        .mockResolvedValueOnce(new Response('Success', { status: 200 }));
      const config = { onChargeCreated: mockHandler };
      const payload = { event: 'OPENPIX:CHARGE_CREATED', data: {} };
      const req = {
        headers: new Map([['x-webhook-signature', 'valid_signature']]),
        json: jest.fn().mockResolvedValue(payload),
      };
      const response = await Handle(config).POST(req as any);
      expect(mockHandler).toHaveBeenCalledWith(payload);
      expect(response.status).toBe(200);
    });

    it('should return 404 if event handler is not found', async () => {
      const mockVerify = {
        write: jest.fn(),
        end: jest.fn(),
        verify: jest.fn().mockReturnValueOnce(true),
      };

      mockedCrypto.createVerify.mockReturnValueOnce(mockVerify as any);
      const req = {
        headers: new Map([['x-webhook-signature', 'valid_signature']]),
        json: jest.fn().mockResolvedValue({ event: 'UNKNOWN_EVENT', data: {} }),
      };
      const response = await Handle({}).POST(req as any);
      expect(response.status).toBe(404);
    });

    it('should have the same configs', async () => {
      const handler = Handle({});
      expect(handler.config).toEqual({});
    });
  });
});
