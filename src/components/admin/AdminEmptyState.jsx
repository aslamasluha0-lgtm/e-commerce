import EmptyState from '@/components/common/EmptyState'
import Button from '@/components/common/Button'

const AdminEmptyState = ({
  title,
  description,
  actionLabel,
  onAction,
  icon,
}) => {
  return (
    <EmptyState
      title={title}
      description={description}
      icon={icon}
      action={
        actionLabel && onAction ? (
          <Button variant="outline" size="sm" onClick={onAction}>
            {actionLabel}
          </Button>
        ) : undefined
      }
    />
  )
}

export default AdminEmptyState