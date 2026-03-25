import "./config/env";
import app from "./app";
import { PORT } from "./config/env";

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server running on port ${PORT}`);
});
