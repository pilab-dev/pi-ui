# 🎨 Pi-UI

<div align="center">

![Version](https://img.shields.io/badge/version-0.0.1-blue.svg)
![License](https://img.shields.io/badge/license-LGPL--3.0--or--later-green.svg)
![React](https://img.shields.io/badge/react-19.1.0-61dafb.svg)
![TypeScript](https://img.shields.io/badge/typescript-5.8.3-3178c6.svg)
![Material-UI](https://img.shields.io/badge/mui-7.1.0-007fff.svg)

*A modern, type-safe React component library built on Material-UI with enhanced form handling and data management capabilities.*

</div>

---

## ✨ Features

- 🚀 **React 19 Ready** - Built with the latest React features
- 🎯 **TypeScript First** - Full type safety with intelligent IntelliSense
- 🎨 **Material-UI Foundation** - Consistent design system with customizable theming
- 📝 **Advanced Form Handling** - Seamless Formik integration with validation
- 📊 **Powerful Data Tables** - Built on TanStack Table for complex data scenarios
- 🧙‍♂️ **Wizard Components** - Multi-step form flows made easy
- 🌓 **Dark Mode Support** - Built-in theme switching capabilities
- 📱 **Responsive Design** - Mobile-first approach
- 🔧 **Developer Experience** - Optimized bundle sizes with tree-shaking

---

## 📦 Installation

```bash
npm install @pilab/pi-ui
```

```bash
yarn add @pilab/pi-ui
```

```bash
pnpm add @pilab/pi-ui
```

### Peer Dependencies

Make sure you have the required peer dependencies installed:

```bash
npm install react react-dom @mui/material @emotion/react @emotion/styled formik @tanstack/react-table react-router-dom
```

---

## 🚀 Quick Start

### 1. Setup Theme Provider

```tsx
import { PiThemeProvider } from '@pilab/pi-ui';
import { useState } from 'react';

function App() {
  const [themeMode, setThemeMode] = useState<'auto' | 'light' | 'dark'>('auto');
  
  return (
    <PiThemeProvider themeMode={themeMode} setThemeMode={setThemeMode}>
      {/* Your app content */}
    </PiThemeProvider>
  );
}
```

### 2. Use Components

```tsx
import { DashboardBox, PiTextField, Button } from '@pilab/pi-ui';
import { useFormik } from 'formik';

function MyComponent() {
  const formik = useFormik({
    initialValues: { name: '', email: '' },
    onSubmit: (values) => console.log(values),
  });

  return (
    <DashboardBox title="User Form">
      <form onSubmit={formik.handleSubmit}>
        <PiTextField
          formik={formik}
          property="name"
          label="Full Name"
          required
        />
        <PiTextField
          formik={formik}
          property="email"
          label="Email"
          type="email"
          required
        />
        <Button type="submit" variant="contained">
          Submit
        </Button>
      </form>
    </DashboardBox>
  );
}
```

---

## 📚 Components

### 🎯 Form Components

#### PiTextField
Enhanced text input with Formik integration and validation display.

```tsx
<PiTextField
  formik={formik}
  property="username"
  label="Username"
  required
  helperText="Enter your username"
/>
```

#### PiPasswordField
Secure password input with visibility toggle.

```tsx
<PiPasswordField
  formik={formik}
  property="password"
  label="Password"
  required
/>
```

#### PiSelect & PiSelectAsync
Dropdown selectors with sync and async data loading.

```tsx
// Static options
<PiSelect
  formik={formik}
  property="country"
  label="Country"
  items={[
    { label: 'United States', value: 'us' },
    { label: 'Canada', value: 'ca' },
  ]}
/>

// Async loading
<PiSelectAsync
  formik={formik}
  property="city"
  label="City"
  loader={() => fetchCities()}
  loadingText="Loading cities..."
/>
```

#### PiCheckbox
Type-safe checkbox with Formik integration.

```tsx
<PiCheckbox
  formik={formik}
  property="acceptTerms"
  label="I accept the terms and conditions"
/>
```

### 📊 Data Display

#### DataTable
Powerful data table with sorting, pagination, and filtering.

```tsx
import { useReactTable, getCoreRowModel, createColumnHelper } from '@tanstack/react-table';

const columnHelper = createColumnHelper<User>();

const columns = [
  columnHelper.accessor('name', {
    header: 'Name',
  }),
  columnHelper.accessor('email', {
    header: 'Email',
  }),
];

const table = useReactTable({
  data: users,
  columns,
  getCoreRowModel: getCoreRowModel(),
});

return <DataTable table={table} />;
```

### 🏗️ Layout Components

#### DashboardBox
Container component for dashboard widgets.

```tsx
<DashboardBox
  title="Statistics"
  loading={isLoading}
  error={error}
  actions={<Button>Refresh</Button>}
  width={400}
>
  <YourContent />
</DashboardBox>
```

#### PiToolbar
Application toolbar with icon and actions.

```tsx
<PiToolbar
  icon={<HomeIcon />}
  label="Dashboard"
  actions={
    <Button variant="contained">
      New Item
    </Button>
  }
>
  <Button>Action 1</Button>
  <PiToolbarDivider />
  <Button>Action 2</Button>
</PiToolbar>
```

### 🗂️ Navigation

#### PiTabs & PiTabPanel
Material-UI enhanced tabs with panels.

```tsx
const [tabValue, setTabValue] = useState(0);

return (
  <>
    <PiTabs value={tabValue} onChange={(_, newValue) => setTabValue(newValue)}>
      <PiTab label="Overview" />
      <PiTab label="Details" />
      <PiTab label="Settings" />
    </PiTabs>
    
    <PiTabPanel value={tabValue} index={0}>
      Overview content
    </PiTabPanel>
    <PiTabPanel value={tabValue} index={1}>
      Details content
    </PiTabPanel>
    <PiTabPanel value={tabValue} index={2}>
      Settings content
    </PiTabPanel>
  </>
);
```

### 💬 Feedback

#### PiDialog
Flexible dialog system with context provider.

```tsx
const dialog = usePiDialog({
  title: 'Confirm Action',
  content: <div>Are you sure you want to proceed?</div>,
  onClose: () => console.log('Dialog closed'),
});

return (
  <PiDialogProvider {...dialog}>
    <Button onClick={dialog.show}>Open Dialog</Button>
  </PiDialogProvider>
);
```

#### PiErrorBox
Standardized error display component.

```tsx
<PiErrorBox showBack icon={<ErrorIcon />}>
  Something went wrong. Please try again.
</PiErrorBox>
```

#### Loading
Flexible loading indicator.

```tsx
<Loading message="Fetching data..." fullScreen />
```

### 🧙‍♂️ Wizard System

Create multi-step forms with validation and navigation.

```tsx
const wizard = useWizard({
  initialData: {},
  steps: [
    {
      label: 'Basic Info',
      title: 'Enter Basic Information',
      icon: <PersonIcon />,
      component: <BasicInfoStep />,
    },
    {
      label: 'Advanced',
      title: 'Advanced Settings',
      icon: <SettingsIcon />,
      component: <AdvancedStep />,
    },
  ],
});

return (
  <Wizard
    title="Setup Wizard"
    wizard={wizard}
    open={isOpen}
    onClose={() => setIsOpen(false)}
  />
);
```

---

## 🎨 Theming

### Custom Theme Configuration

```tsx
import { PiThemeProvider } from '@pilab/pi-ui';

// The theme provider handles light/dark mode automatically
// and provides consistent styling across all components
```

### Theme Modes

- `auto` - Follows system preference
- `light` - Force light mode
- `dark` - Force dark mode

---

## 🔧 TypeScript Support

All components are fully typed with TypeScript. Form components automatically infer types from your Formik configuration:

```tsx
interface UserForm {
  name: string;
  email: string;
  age: number;
}

const formik = useFormik<UserForm>({
  initialValues: { name: '', email: '', age: 0 },
  onSubmit: (values) => {
    // values is automatically typed as UserForm
  },
});

// Property names are type-checked
<PiTextField
  formik={formik}
  property="name" // ✅ Valid
  // property="invalid" // ❌ TypeScript error
  label="Name"
/>
```

---

## 📱 Responsive Design

All components are built with mobile-first responsive design principles and adapt seamlessly to different screen sizes.

---

## 🛠️ Development

### Building the Library

```bash
npm run build
```

### Development Mode

```bash
npm run dev
```

### Project Structure

```
pi-ui/
├── src/
│   ├── components/          # Core components
│   ├── wizard/             # Wizard system
│   ├── hooks.ts            # Custom hooks
│   ├── PiThemeProvider.tsx # Theme system
│   └── index.ts            # Main exports
├── package.json
└── tsconfig.json
```

---

## 📄 License

This project is licensed under the [LGPL-3.0-or-later](LICENSE.md) License.

---

## 🤝 Contributing

We welcome contributions! Please feel free to submit issues and pull requests.

---

## 📞 Support

For questions and support, please open an issue on our GitHub repository.

---

<div align="center">

**Made with ❤️ by the Progressive Innovation LAB**

</div>