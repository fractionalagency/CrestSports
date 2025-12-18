import { Router, Request, Response } from 'express';
import { Resend } from 'resend';
import { config } from '@config/env';
import { sendSuccess } from '@utils/response';

const router: Router = Router();
const resend = new Resend(config.email.apiKey);

router.post('/email', async (req: Request, res: Response) => {
  const { email } = req.body;

  try {
    const response = await resend.emails.send({
      from: config.email.from,
      to: [email],
      subject: 'Test Email from CrestSports Dev',
      html: '<h1>It works!</h1><p>This is a test email from the dev tools.</p>',
    });

    return sendSuccess(res, {
      message: 'Email sent attempt finished',
      response,
    });
  } catch (error) {
    console.error('Dev email error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to send email',
      error: error instanceof Error ? error.message : String(error),
    });
  }
});

export default router;
