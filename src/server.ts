import { App } from '@/app';
import { AuthRoute } from '@routes/auth.route';
import { UserRoute } from '@routes/users.route';
import { IndexRoute } from '@routes/index.route';
import { MemberRoute } from '@routes/member.route';
import { ExpenseRoute } from '@routes/expense.route';
import { PaymentRoute } from '@routes/payment.route';
import { HistoryRoute } from '@routes/history.route';
import { AttendanceRoute } from '@routes/attendance.route';
import { HomeRoute } from '@routes/home.route';
import { ProfileRoute } from '@routes/profile.route';
import { ValidateEnv } from '@utils/validateEnv';

ValidateEnv();

const app = new App([
  new IndexRoute(),
  new UserRoute(),
  new AuthRoute(),
  new MemberRoute(),
  new ExpenseRoute(),
  new PaymentRoute(),
  new HistoryRoute(),
  new AttendanceRoute(),
  new HomeRoute(),
  new ProfileRoute(),
]);

app.listen();
