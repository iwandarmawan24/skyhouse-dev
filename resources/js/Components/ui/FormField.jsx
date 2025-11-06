import { Label } from './Label';
import { Input } from './Input';
import { Textarea } from './Textarea';
import { Select } from './Select';
import { cn } from '@/lib/utils';

function FormField({ label, name, error, required, description, className, children }) {
    return (
        <div className={cn('space-y-2', className)}>
            {label && (
                <Label htmlFor={name} required={required}>
                    {label}
                </Label>
            )}
            {children}
            {description && <p className="text-sm text-gray-500">{description}</p>}
            {error && <p className="text-sm font-medium text-red-600">{error}</p>}
        </div>
    );
}

function FormInput({ label, name, error, required, description, className, ...props }) {
    return (
        <FormField label={label} name={name} error={error} required={required} description={description} className={className}>
            <Input id={name} name={name} error={error} {...props} />
        </FormField>
    );
}

function FormTextarea({ label, name, error, required, description, className, ...props }) {
    return (
        <FormField label={label} name={name} error={error} required={required} description={description} className={className}>
            <Textarea id={name} name={name} error={error} {...props} />
        </FormField>
    );
}

function FormSelect({ label, name, error, required, description, className, children, ...props }) {
    return (
        <FormField label={label} name={name} error={error} required={required} description={description} className={className}>
            <Select id={name} name={name} error={error} {...props}>
                {children}
            </Select>
        </FormField>
    );
}

export { FormField, FormInput, FormTextarea, FormSelect };
