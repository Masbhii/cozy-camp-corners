
import { useState } from 'react';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isToday, isSameMonth, getDay } from 'date-fns';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

// Define project type
interface ProjectEvent {
  id: string;
  name: string;
  description: string;
  date: Date;
  status: 'on-track' | 'at-risk' | 'behind';
}

const CalendarPage = () => {
  const { toast } = useToast();
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [projects, setProjects] = useState<ProjectEvent[]>([
    {
      id: '1',
      name: 'Website Redesign',
      description: 'Redesign the company website',
      date: new Date('2025-04-15'),
      status: 'on-track'
    },
    {
      id: '2',
      name: 'Mobile App Launch',
      description: 'Launch the new mobile app',
      date: new Date('2025-04-20'),
      status: 'at-risk'
    }
  ]);
  const [newProject, setNewProject] = useState({
    name: '',
    description: '',
    date: new Date(),
  });

  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

  const handleAddProject = () => {
    if (!newProject.name.trim()) {
      toast({
        title: "Error",
        description: "Project name is required",
        variant: "destructive"
      });
      return;
    }

    const project: ProjectEvent = {
      id: Date.now().toString(),
      name: newProject.name,
      description: newProject.description,
      date: newProject.date,
      status: 'on-track'
    };

    setProjects([...projects, project]);
    setNewProject({ name: '', description: '', date: new Date() });
    
    toast({
      title: "Success",
      description: "Project has been added to the calendar",
    });
  };

  const renderCalendar = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(currentMonth);
    const startDate = monthStart;
    const endDate = monthEnd;
    const days = eachDayOfInterval({ start: startDate, end: endDate });

    // Adjust for starting the week on Sunday (0) to Monday (1)
    const startDay = getDay(monthStart);
    
    // Create 7x6 calendar grid (42 cells)
    const totalCells = 42;
    const calendarCells = Array.from({ length: totalCells });
    const daysWithPadding = [...Array(startDay).fill(null), ...days];
    
    // Group days into weeks
    const weeks = [];
    for (let i = 0; i < daysWithPadding.length; i += 7) {
      weeks.push(daysWithPadding.slice(i, i + 7));
    }

    return (
      <div className="mt-4">
        <div className="grid grid-cols-7 gap-1 text-center text-sm font-semibold text-neutral-gray mb-2">
          <div>Sun</div>
          <div>Mon</div>
          <div>Tue</div>
          <div>Wed</div>
          <div>Thu</div>
          <div>Fri</div>
          <div>Sat</div>
        </div>
        <div className="grid grid-cols-7 gap-1">
          {weeks.map((week, weekIndex) => 
            week.map((day, dayIndex) => {
              // Skip rendering empty cells after the last day of the month
              if (!day && weekIndex > 0 && dayIndex === 0) return null;
              
              const dayProjects = projects.filter(project => 
                day ? format(project.date, 'yyyy-MM-dd') === format(day, 'yyyy-MM-dd') : false
              );
              
              return (
                <div 
                  key={`${weekIndex}-${dayIndex}`}
                  className={`
                    min-h-24 border border-cool-gray/20 p-1 relative rounded-md
                    ${!day ? 'bg-gray-50' : 'bg-white'}
                    ${day && isToday(day) ? 'border-primary-purple border-2' : ''}
                    ${day && !isSameMonth(day, currentMonth) ? 'text-gray-400' : ''}
                  `}
                >
                  {day && (
                    <>
                      <div className="text-right p-1">
                        {format(day, 'd')}
                      </div>
                      <div className="space-y-1 overflow-y-auto max-h-20">
                        {dayProjects.map(project => (
                          <div 
                            key={project.id}
                            className={`
                              text-xs p-1 rounded text-white truncate
                              ${project.status === 'on-track' ? 'bg-green-500' : 
                                project.status === 'at-risk' ? 'bg-amber-500' : 'bg-red-500'}
                            `}
                          >
                            {project.name}
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              );
            })
          ).flat().filter(Boolean)}
        </div>
      </div>
    );
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-neutral-gray">Project Calendar</h1>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <button 
              onClick={prevMonth}
              className="p-2 rounded-full hover:bg-gray-100"
              aria-label="Previous month"
            >
              <ChevronLeft size={20} />
            </button>
            <h2 className="font-medium">{format(currentMonth, 'MMMM yyyy')}</h2>
            <button 
              onClick={nextMonth}
              className="p-2 rounded-full hover:bg-gray-100"
              aria-label="Next month"
            >
              <ChevronRight size={20} />
            </button>
          </div>
          
          <Dialog>
            <DialogTrigger asChild>
              <Button className="btn-primary" aria-label="Add Project">
                <Plus size={18} />
                <span>Add Project</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add New Project</DialogTitle>
                <DialogDescription>
                  Create a new project and add it to the calendar.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="project-name">Project Name</Label>
                  <Input 
                    id="project-name"
                    value={newProject.name}
                    onChange={(e) => setNewProject({...newProject, name: e.target.value})}
                    placeholder="Enter project name"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="project-description">Description</Label>
                  <Textarea
                    id="project-description"
                    value={newProject.description}
                    onChange={(e) => setNewProject({...newProject, description: e.target.value})}
                    placeholder="Enter project description"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="project-date">Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left font-normal"
                        id="project-date"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {format(newProject.date, 'PPP')}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={newProject.date}
                        onSelect={(date) => date && setNewProject({...newProject, date})}
                        initialFocus
                        className="p-3 pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button onClick={handleAddProject}>Add Project</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="card-paper p-5">
        {renderCalendar()}
      </div>
    </div>
  );
};

export default CalendarPage;
