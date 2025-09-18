# LedgerLoop - XRPL Lending Circles MVP

<div align="center">

![LedgerLoop Homepage](https://github.com/user-attachments/assets/3b0d03d7-06ca-49bc-9c33-ca2ba9152f5c)

**A decentralized lending circle platform built on the XRP Ledger**

[![Demo](https://img.shields.io/badge/Demo-Live-brightgreen)](http://localhost:3000)
[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](LICENSE)
[![XRPL](https://img.shields.io/badge/Built%20with-XRPL-orange)](https://xrpl.org/)
[![React](https://img.shields.io/badge/Frontend-React%2018-blue)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/Language-TypeScript-blue)](https://www.typescriptlang.org/)

</div>

## 🚀 Overview

LedgerLoop is a React-based MVP that enables peer-to-peer lending through traditional lending circles (ROSCAs) on the XRP Ledger. Users can create or join lending circles, make contributions, request loans, and build their financial reputation—all secured by blockchain technology.

## ✨ Features

### 🔗 Core Functionality
- **XRPL Wallet Integration**: Secure wallet connection (XUMM-ready architecture)
- **Lending Circles Management**: Create and join lending circles with customizable parameters
- **Member Dashboard**: Track contributions, loans, and circle participation
- **Loan Requests**: Submit and manage borrowing requests with validation
- **Interest Calculator**: Advanced calculator with simple and compound interest options
- **Transaction History**: View detailed transaction records
- **Circle Status Tracking**: Monitor circle health and member activity

### 🎨 User Experience
- **Responsive Design**: Built with Tailwind CSS for mobile-first experience
- **Intuitive Navigation**: Clean, modern interface with emoji-enhanced navigation
- **Real-time Calculations**: Live interest and payment calculations
- **Demo-Ready**: Fully functional with mock data for demonstrations

### 🛠 Technical Features
- **TypeScript**: Full type safety and developer experience
- **Testnet Integration**: Configured for XRPL testnet development
- **Modular Architecture**: Clean separation of concerns with hooks and services
- **Error Handling**: Comprehensive error states and user feedback
- **Form Validation**: Client-side validation for all user inputs

## 📱 Screenshots

### Connected Wallet State
![Wallet Connected](https://github.com/user-attachments/assets/ff24f777-bd96-444a-a7f9-ad84c09b358b)

### Interest Calculator
![Interest Calculator](https://github.com/user-attachments/assets/1b57dffa-43e8-4354-9f55-57eb27b0821b)

## 🏗 Architecture

```
src/
├── components/          # Reusable UI components
│   ├── WalletConnection.tsx
│   ├── LendingCircles.tsx
│   ├── MemberDashboard.tsx
│   ├── BorrowRequestForm.tsx
│   ├── InterestCalculator.tsx
│   ├── TransactionHistory.tsx
│   └── Navigation.tsx
├── hooks/               # Custom React hooks
│   └── useWallet.ts
├── pages/               # Route components
│   ├── Dashboard.tsx
│   ├── CirclesPage.tsx
│   ├── BorrowPage.tsx
│   └── CalculatorPage.tsx
├── services/            # External service integrations
│   └── xummService.ts
├── types/               # TypeScript type definitions
│   └── index.ts
└── utils/               # Utility functions
    └── index.ts
```

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ and npm
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/LedgerCircle/frontend.git
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

### Building for Production

```bash
npm run build
```

The build artifacts will be stored in the `build/` directory.

## 🔧 Configuration

### Environment Variables (Optional)

Create a `.env` file in the project root:

```env
REACT_APP_XUMM_API_KEY=your_xumm_api_key
REACT_APP_XUMM_API_SECRET=your_xumm_api_secret
REACT_APP_XRPL_NETWORK=testnet
```

**Note**: The app works with demo data without API keys for development and demonstration purposes.

## 💡 Usage Guide

### 1. Connect Your Wallet
- Click "Connect with XUMM" to simulate wallet connection
- View your wallet address and balance in the navigation

### 2. Explore Lending Circles
- Visit the "Circles" page to see available lending circles
- Join circles or view your existing memberships
- Each circle shows total pool, contribution requirements, and member count

### 3. Member Dashboard
- Track your contributions across all circles
- Monitor active loans and repayment status
- View detailed circle membership information

### 4. Request Loans
- Navigate to the "Borrow" page
- Select an eligible circle (active membership, no existing loans)
- Fill out loan request with amount, duration, and reason
- View calculated interest and repayment terms

### 5. Calculate Interest
- Use the advanced interest calculator
- Compare simple vs compound interest options
- Try preset scenarios for common loan types
- View detailed breakdowns and payment schedules

## 🏦 Lending Circle Concepts

### How Lending Circles Work
1. **Formation**: A group of trusted individuals forms a circle
2. **Contributions**: Members make regular contributions to a shared pool
3. **Rotation**: Members take turns receiving loans from the pool
4. **Repayment**: Borrowers repay with agreed interest
5. **Trust Building**: Successful participation builds reputation

### Circle Parameters
- **Total Amount**: Maximum pool size
- **Contribution Amount**: Required regular contribution per member
- **Duration**: Circle lifetime in days
- **Interest Rate**: Annual percentage rate for loans
- **Member Limit**: Maximum number of participants

## 🛡 Security Features

- **Testnet Only**: Configured for safe testing environment
- **Address Validation**: XRPL address format validation
- **Input Sanitization**: All user inputs are validated and sanitized
- **Error Boundaries**: Graceful error handling throughout the app
- **Type Safety**: Full TypeScript coverage for runtime safety

## 🔮 Future Enhancements

### Phase 2 Features
- [ ] Full XUMM integration with real wallet signing
- [ ] Smart contract integration for automated circle management
- [ ] Credit scoring based on on-chain history
- [ ] Multi-currency support (USD, EUR, etc.)
- [ ] Mobile app development
- [ ] Social features and referral system

### Technical Improvements
- [ ] State management with Redux/Zustand
- [ ] GraphQL API integration
- [ ] Progressive Web App (PWA) features
- [ ] Automated testing suite
- [ ] CI/CD pipeline
- [ ] Performance optimization

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

### Development Workflow
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the Apache License 2.0 - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [XRPL Foundation](https://xrpl.org/) for the robust blockchain infrastructure
- [XUMM](https://xumm.app/) for wallet integration capabilities
- [Tailwind CSS](https://tailwindcss.com/) for the beautiful design system
- The traditional ROSCA communities that inspired this platform

## 📧 Contact

For questions about this project, please open an issue or contact the development team.

---

<div align="center">
  <p>Built with ❤️ for the XRPL community</p>
  <p>Ready for grant applications and further development</p>
</div>