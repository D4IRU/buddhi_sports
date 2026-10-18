import * as React from "react"
import { Field as FieldPrimitive } from "@base-ui/react/field"
import { Form as FormPrimitive } from "@base-ui/react/form"
import { cn } from "cn"

/* -------------------------------------------------------------------------- */
/*  Form (wraps @base-ui Form)                                                */
/* -------------------------------------------------------------------------- */

function Form({ ...props }: React.ComponentProps<typeof FormPrimitive>) {
  return <FormPrimitive data-slot="form" {...props} />
}

/* -------------------------------------------------------------------------- */
/*  FormField (wraps @base-ui Field.Root)                                     */
/* -------------------------------------------------------------------------- */

function FormField({
  className,
  ...props
}: FieldPrimitive.Root.Props) {
  return (
    <FieldPrimitive.Root
      data-slot="form-field"
      className={cn("space-y-2", className)}
      {...props}
    />
  )
}

/* -------------------------------------------------------------------------- */
/*  FormLabel                                                                 */
/* -------------------------------------------------------------------------- */

function FormLabel({
  className,
  ...props
}: FieldPrimitive.Label.Props) {
  return (
    <FieldPrimitive.Label
      data-slot="form-label"
      className={cn(
        "flex items-center gap-2 text-sm font-medium leading-none select-none group-data-[disabled]:pointer-events-none group-data-[disabled]:opacity-50",
        className
      )}
      {...props}
    />
  )
}

/* -------------------------------------------------------------------------- */
/*  FormControl                                                               */
/* -------------------------------------------------------------------------- */

function FormControl({
  className,
  ...props
}: FieldPrimitive.Control.Props) {
  return (
    <FieldPrimitive.Control
      data-slot="form-control"
      className={cn(className)}
      {...props}
    />
  )
}

/* -------------------------------------------------------------------------- */
/*  FormDescription                                                           */
/* -------------------------------------------------------------------------- */

function FormDescription({
  className,
  ...props
}: FieldPrimitive.Description.Props) {
  return (
    <FieldPrimitive.Description
      data-slot="form-description"
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  )
}

/* -------------------------------------------------------------------------- */
/*  FormError                                                                 */
/* -------------------------------------------------------------------------- */

function FormError({
  className,
  ...props
}: FieldPrimitive.Error.Props) {
  return (
    <FieldPrimitive.Error
      data-slot="form-error"
      className={cn(
        "text-sm font-medium text-destructive",
        className
      )}
      {...props}
    />
  )
}

/* -------------------------------------------------------------------------- */
/*  FormItem – convenience wrapper for Field.Item (radio/checkbox groups)     */
/* -------------------------------------------------------------------------- */

function FormItem({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      data-slot="form-item"
      className={cn("flex items-center gap-2", className)}
      {...props}
    />
  )
}

/* -------------------------------------------------------------------------- */
/*  Exports                                                                   */
/* -------------------------------------------------------------------------- */

export {
  Form,
  FormField,
  FormLabel,
  FormControl,
  FormDescription,
  FormError,
  FormItem,
}
