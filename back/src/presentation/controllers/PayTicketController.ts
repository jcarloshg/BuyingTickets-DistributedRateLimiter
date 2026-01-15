import { Request, Response } from 'express';
import { PayTicketInputSchema } from '../../application/buy-ticket/models/PayTicketInput';
import { PayTicketUseCase } from '../../application/buy-ticket/application/PayTicketUseCase';
import { InMemoryTicketPayment } from '../../application/buy-ticket/infrastructure/InMemoryTicketPayment';

// Auth validation middleware should set req.user, not shown here. Assume user is authenticated!

const paymentService = new InMemoryTicketPayment();
const useCase = new PayTicketUseCase(paymentService);

export async function payTicketController(req: Request, res: Response) {
  try {
    // Validate body (throws if invalid)
    const input = PayTicketInputSchema.parse(req.body);

    // In a real backend, extract user from req.user, verify token, etc
    // Here we just rely on JWT/Auth middleware before this controller.

    const result = await useCase.execute(input);
    // Output total and total with VAT/IVA
    res.status(200).json(result);
  } catch (err: any) {
    res.status(400).json({ error: err.message || 'Invalid payment data' });
  }
}
