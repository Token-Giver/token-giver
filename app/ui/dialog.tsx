"use client";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { ComponentPropsWithoutRef, ElementRef, forwardRef } from "react";
import { cn } from "../utils";
import CloseIcon from "@/svgs/CloseIcon";

// Core Components:
const Dialog = DialogPrimitive.Root; // Main container
const DialogTrigger = DialogPrimitive.Trigger; // Element that opens the modal
const DialogPortal = DialogPrimitive.Portal; // Renders modal outside current DOM hierarchy
const DialogClose = DialogPrimitive.Close; // Element that closes the modal

const DialogOverlay = forwardRef<
  ElementRef<typeof DialogPrimitive.Overlay>,
  ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-50 bg-black/80 data-[state=closed]:animate-fadeOut data-[state=open]:animate-fadeIn",
      className
    )}
    {...props}
  />
));

DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

const DialogContent = forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> & {
    closeable?: boolean;
    onClose?: () => void;
    closeClassname?: string;
  }
>(
  (
    {
      className,
      children,
      closeClassname,
      closeable = true,
      onClose,
      ...props
    },
    ref
  ) => (
    <DialogPortal>
      <DialogOverlay />
      <DialogPrimitive.Content
        ref={ref}
        className={cn(
          "fixed left-[50%] top-[50%] z-50 flex w-[25rem] rounded-[10px] max-w-[95vw] translate-x-[-50%] translate-y-[-50%] flex-col justify-center gap-6 overflow-y-auto bg-white shadow-lg outline-none duration-200  sm:max-w-[800px] sm:border md:w-full",
          "data-[state=closed]:animate-fadeOut data-[state=open]:animate-fadeIn",
          className
        )}
        {...props}
      >
        {children}
        {closeable && (
          <DialogPrimitive.Close
            onClick={onClose}
            className={cn(
              "absolute right-3.5 top-3.5 grid h-[2rem] w-[2rem] cursor-pointer place-content-center rounded-full bg-[#E8E8E8] opacity-70 transition-opacity hover:opacity-100 focus:border-2 focus:border-action-primary focus:opacity-100 focus:outline-none disabled:pointer-events-none",
              closeClassname
            )}
          >
            <CloseIcon />
            <span className="sr-only">Close</span>
          </DialogPrimitive.Close>
        )}
      </DialogPrimitive.Content>
    </DialogPortal>
  )
);
DialogContent.displayName = DialogPrimitive.Content.displayName;

const DialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col space-y-1.5 text-center sm:text-left",
      className
    )}
    {...props}
  />
);
DialogHeader.displayName = "DialogHeader";

const DialogFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn("flex flex-col sm:flex-row sm:space-x-2", className)}
    {...props}
  />
);
DialogFooter.displayName = "DialogFooter";

const DialogTitle = forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title> & {
    srOnly?: boolean;
  }
>(({ className, srOnly, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn("text-lg leading-7", srOnly && "sr-only", className)}
    {...props}
  />
));
DialogTitle.displayName = DialogPrimitive.Title.displayName;

const DialogDescription = forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn("text-muted-foreground text-sm", className)}
    {...props}
  />
));
DialogDescription.displayName = DialogPrimitive.Description.displayName;

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogTrigger,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
};
