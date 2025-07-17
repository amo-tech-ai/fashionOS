import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Alert, Button, Stack, Text } from '@mantine/core';
import { IconAlertCircle } from '@tabler/icons-react';

interface WidgetErrorBoundaryProps {
  children: React.ReactNode;
  widgetName?: string;
}

function WidgetErrorFallback({ error, resetErrorBoundary, widgetName }: any) {
  return (
    <Alert
      icon={<IconAlertCircle size={16} />}
      title={`${widgetName || 'Widget'} Error`}
      color="red"
      variant="light"
    >
      <Stack spacing="xs">
        <Text size="sm">Failed to load this component</Text>
        <Text size="xs" color="dimmed">{error.message}</Text>
        <Button size="xs" onClick={resetErrorBoundary} variant="outline">
          Retry
        </Button>
      </Stack>
    </Alert>
  );
}

export function WidgetErrorBoundary({ children, widgetName }: WidgetErrorBoundaryProps) {
  return (
    <ErrorBoundary
      fallbackRender={({ error, resetErrorBoundary }) => (
        <WidgetErrorFallback
          error={error}
          resetErrorBoundary={resetErrorBoundary}
          widgetName={widgetName}
        />
      )}
      onReset={() => {
        // Optional: Log error recovery
        console.log(`Widget ${widgetName} recovered from error`);
      }}
    >
      {children}
    </ErrorBoundary>
  );
}