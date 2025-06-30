import express from 'express';
import https from 'https';
import fs from 'fs';
import cors from 'cors';
import helmet from 'helmet';
import authRoutes from './routes/authRoutes.js';
import { config } from './config/config.js';

const app = express();

// Security middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Create a self-signed certificate for development
const httpsOptions = {
  key: `-----BEGIN PRIVATE KEY-----
MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC7VJTUt9Us8cKB
wQNneCjGQJw2TM5WH0ObBvRFnhQiinXCxdrMGCL6phQcs30cINhw1SgQQlClcHnL
OkqdjMYtqV5CgLvPSdnI3NjcI7mi+dVxXlgUPFKfaJdJ3y3wPdGdb1C1VLn5kX5y
6hHwjkCdpTSgMzJ3VqGczGiqVvs5Rw2vt1BX0XqVKy/QQaDLw6BqnyClWg1+X5C8
2VTIyQDqfmIVxfJFzPOTrNBBh7IAjnukSsWxh6MMcV+kkOhwjIuUBZsoePjbWwng
Qg+wBfEuVVi9RuAijSLMpVDRDM7QLuMFlzjigJ6+fzT1hNjHFVkEaXw5R9+d+QlD
VkEgPrMVAgMBAAECggEBALc2lQGY5f6i7isjHGRhyzdYhM+yuxJE7xIBhauD5Hs6
hQzuJiuFXLwGc0zcOqfrI0LadG4cFKGFS4yrIGVxBxSxeNfAB26LjmPv8Vjo/9x4
0cKR+SfAaqV2fIroAM1A5-VUthwlXI2gVHNk+rTMRqCjGCmPiJzxBpVzVpFpKrHr
8CqVN0qqHowT4Yb1Dd9pMhMDraI+w2xHuwcKlYPiGI4Dd9kCxDyMy8nvdEccX4iY
6ak1ufydTaOiSRoXijeT2nYuq09RqUfzaRXBdLlMdJ3LQbrqidqaIFMTKyTywh4T
B2F0B2oGTMJTzIx6NiNy4eFhCO4A0QQGUJeXPk+JSgECgYEA8Nnq2YycvQI8fX/I
ksK+IkTXjyMBkklQviAiArdOAMJARP/7dty0oXGlQQyI/g1RzOQw4c+P6xtAesMz
E+gE4Ohd3y5lqahz/do0fcCVNT8Accg8QcPP+nzQQaRHdHdGMjmtg8+maGTyh0S3
jTBgLmmirPEoONyQzSN+ILq2vVECgYEAxqCXjWqgEn4QM7DropeRMuOrWniyOMi9
uROygc1EyMVLuNgK9HINvp7hy/ufQ6lo5FLxjb8gDrMzR1j/SjBSBHfTy9OWBHoV
+SPE+Gf1cZoOaStAlmJmqmLW2PxuNjiin1PUNjn4qxSN+milR0hh+z/UiWMco/m8
Y8G4/Dh2rVUCgYAg+q0c1YwzAoGBAMDvCSoGGWiuJiUOJiuQw+PiM4xGoBJGlcIh
kK0iuEcxdxuJkrHuNGnKyBXVrAcAkCLcHFnK5cnz/cWw5F+VtgMeKTFwRS2AsrpF
XTjgdiyOb8LdDk2yCuNKkJ+fqSYwzV8GeGeVdDFyNfMPB1C9R4KjvQKBgBYfoqwI
6sbwWSQAuWPiuNXW0s/jhzVkUx+UN99CliC7E1W/LO7ZdoXSBuuXiHRyADiQVDAi
VHt65chw0NjSOxSiS5X3TLPJRIFA6i9VgMw7Qrl9Y8T2jI0aS+c5o/5g0wKBgQDl
TvLY8PYVHMolyDmrPC9bgJzf4AHMH8lqE8pjwFgvGTI2jzZvEZ8f+dO+WOzOEe2A
nAhyPn7jtqtduzpy/4cnXaCWnHaijMexLCHcZGL/7ft6uEiOFplbHKkHQAS5bP/E
EBjHFSMhzwhaBb27dGlEz+zTiTzGAo2QfYwOVuYQHg==
-----END PRIVATE KEY-----`,
  cert: `-----BEGIN CERTIFICATE-----
MIIDXTCCAkWgAwIBAgIJAJC1HiIAZAiIMA0GCSqGSIb3DQEBBQUAMEUxCzAJBgNV
BAYTAkFVMRMwEQYDVQQIDApTb21lLVN0YXRlMSEwHwYDVQQKDBhJbnRlcm5ldCBX
aWRnaXRzIFB0eSBMdGQwHhcNMTExMjMxMDg1OTU5WhcNMTIxMjMwMDg1OTU5WjBF
MQswCQYDVQQGEwJBVTETMBEGA1UECAwKU29tZS1TdGF0ZTEhMB8GA1UECgwYSW50
ZXJuZXQgV2lkZ2l0cyBQdHkgTHRkMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIB
CgKCAQEAu1SU1L7VLPHCgcEDZ3goxkCcNkzOVh9DmwbURZ4UIop1wsXazBgi+qYU
HLN9HCDYcNUoEEJQpXB5yzpKnYzGLaleQoC7z0nZyNzY3CO5ovnVcV5YFDxSn2iX
Sd8t8D3RnW9QtVS5+ZF+cuoR8I5AnaU0oDMyd1ahnMxoqlb7OUcNr7dQV9F6lSsv
0EGgy8OgapsgpVoNfl+QvNlUyMkA6n5iFcXyRczzk6zQQYeyAI57pErFsYejDHFf
pJDocIyLlAWbKHj421sJ4EIPsAXxLlVYvUbgIo0izKVQ0QzO0C7jBZc44oCevn80
9YTYxxVZBGl8OUffnfkJQ1ZBID6zFQIDAQABo1AwTjAdBgNVHQ4EFgQUU3m/WqoR
t4mTxJkzqx2KwMfux2YwHwYDVR0jBBgwFoAUU3m/WqorRt4mTxJkzqx2KwMfux2Y
wAwGA1UdEwQFMAMBAf8wDQYJKoZIhvcNAQEFBQADggEBABpzQHn6B4l4+uJHZbwp
vGjZ1p+pBmyenJZ2eCXe2dBxbYRitUyxHVHiLyierdddyXQD4xYic7akXsKVf1xY
r9hbTeD+KbkAmVumhziHvs1JQiD0iTHKaGpHoAHf6Zkpw/p28IhIuuUqiGd98uJt
VqQtUFvOhiWEiS8+eXiHtw4Pc8vsarLlOtVrAvqoYLzsbHZaHjfi63WD2StjebPk
LeGzaGxVCXqAK0lA8s/GTXZX8RlKqtonDCMnLiPzjJ1TudKShuknZn1mOdAFTVAx
4RxQMn20cVaFG7brvkb5k5staMjKAnpJfZ5oaaw8AdgTR6Dki63Lfxs9+KpQ+OxA
mSw=
-----END CERTIFICATE-----`
};

// Start HTTPS server
https.createServer(httpsOptions, app).listen(config.port, () => {
  console.log(`HTTPS Server running on port ${config.port}`);
});