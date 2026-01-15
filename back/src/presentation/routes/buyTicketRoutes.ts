import { Router } from 'express';
import { payTicketController } from '../controllers/PayTicketController';
// import { requireAuth } from '../middlewares/requireAuth'; // You should have a JWT middleware!
import { zodValidate } from '../middlewares/zodValidate';
import { PayTicketInputSchema } from '../../application/buy-ticket/models/PayTicketInput';
import { requireAuth } from '../middlewares/requireAuth';
import { BuyTicketRateLimiterMiddleware } from '../middlewares/BuyTicket.RateLimiter.middleware';

const router = Router();

// Ensure you add requireAuth before zodValidate in production
router.post(
    '/pay-ticket',
    requireAuth,
    BuyTicketRateLimiterMiddleware,
    zodValidate(PayTicketInputSchema),
    payTicketController
);

export default router;
