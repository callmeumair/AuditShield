'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Textarea } from '@/components/ui/textarea';
import { addPolicy } from '@/app/actions/policies';
import { Plus } from 'lucide-react';
import { toast } from 'sonner'; // Assuming sonner is installed, or we'll simple alert

export function AddPolicyDialog() {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    async function clientAction(formData: FormData) {
        setLoading(true);
        try {
            const result = await addPolicy(formData);
            if (result?.error) {
                toast.error(result.error);
            } else {
                toast.success('Policy added successfully');
                setOpen(false);
            }
        } catch (error) {
            toast.error('Failed to add policy');
        } finally {
            setLoading(false);
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Policy
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add New Policy</DialogTitle>
                    <DialogDescription>
                        Define a rule for a specific AI tool.
                    </DialogDescription>
                </DialogHeader>
                <form action={clientAction} className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="toolName" className="text-right">
                            AI Tool
                        </Label>
                        <Select name="toolName" required>
                            <SelectTrigger className="col-span-3">
                                <SelectValue placeholder="Select AI tool" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="ChatGPT">ChatGPT</SelectItem>
                                <SelectItem value="Claude">Claude</SelectItem>
                                <SelectItem value="Gemini">Gemini</SelectItem>
                                <SelectItem value="Copilot">Copilot</SelectItem>
                                <SelectItem value="Perplexity">Perplexity</SelectItem>
                                <SelectItem value="Other">Other</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="action" className="text-right">
                            Action
                        </Label>
                        <Select name="action" defaultValue="allow">
                            <SelectTrigger className="col-span-3">
                                <SelectValue placeholder="Action" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="allow">Allow</SelectItem>
                                <SelectItem value="block">Block</SelectItem>
                                <SelectItem value="review">Review</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="reason" className="text-right">
                            Reason
                        </Label>
                        <Textarea id="reason" name="reason" placeholder="Why is this rule defined?" className="col-span-3" />
                    </div>
                    <DialogFooter>
                        <Button type="submit" disabled={loading}>
                            {loading ? 'Saving...' : 'Save Policy'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
