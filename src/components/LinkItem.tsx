
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { LinkItem } from '@/utils/storage';
import { GripVertical, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LinkItemProps {
  link: LinkItem;
  onUpdate: (id: string, updates: Partial<LinkItem>) => void;
  onDelete: (id: string) => void;
  isDragging?: boolean;
}

const LinkItemComponent: React.FC<LinkItemProps> = ({ 
  link, 
  onUpdate, 
  onDelete,
  isDragging = false
}) => {
  return (
    <Card className={cn("mb-3 relative", isDragging && "opacity-50")}>
      <CardContent className="p-4 flex items-center gap-2">
        <div className="cursor-move touch-none">
          <GripVertical size={20} className="text-muted-foreground" />
        </div>
        
        <div className="flex-1 flex flex-col sm:flex-row gap-3">
          <Input
            placeholder="Label"
            value={link.label}
            onChange={(e) => onUpdate(link.id, { label: e.target.value })}
            className="flex-1"
          />
          
          <Input
            placeholder="URL (https://...)"
            value={link.url}
            onChange={(e) => onUpdate(link.id, { url: e.target.value })}
            className="flex-1"
          />
          
          <Input
            placeholder="Icon (optional)"
            value={link.icon || ''}
            onChange={(e) => onUpdate(link.id, { icon: e.target.value })}
            className="sm:w-1/4"
          />
        </div>
        
        <Button 
          variant="ghost" 
          size="icon"
          className="shrink-0 text-muted-foreground hover:text-destructive"
          onClick={() => onDelete(link.id)}
        >
          <X size={18} />
        </Button>
      </CardContent>
    </Card>
  );
};

export default LinkItemComponent;
