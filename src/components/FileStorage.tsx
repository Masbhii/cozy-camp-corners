
import { FileText, FileImage, File, Download } from 'lucide-react';

export interface FileItem {
  id: string;
  name: string;
  type: 'document' | 'image' | 'other';
  size: string;
  uploadedBy: string;
  uploadDate: string;
}

interface FileStorageProps {
  files: FileItem[];
}

const FileStorage = ({ files }: FileStorageProps) => {
  const getFileIcon = (type: string) => {
    switch (type) {
      case 'document':
        return <FileText size={20} className="text-primary-purple" />;
      case 'image':
        return <FileImage size={20} className="text-primary-purple" />;
      default:
        return <File size={20} className="text-primary-purple" />;
    }
  };

  return (
    <div className="card-paper p-5">
      <h3 className="font-semibold text-lg text-neutral-gray mb-4">Files</h3>
      
      <div className="space-y-3">
        {files.map((file) => (
          <div 
            key={file.id} 
            className="flex items-center justify-between p-3 rounded-lg border border-cool-gray/30 bg-white hover:shadow-sm transition-shadow"
          >
            <div className="flex items-center gap-3">
              {getFileIcon(file.type)}
              <div>
                <div className="font-medium text-sm text-neutral-gray">{file.name}</div>
                <div className="text-xs text-neutral-gray/70">{file.size} • {file.uploadDate}</div>
              </div>
            </div>
            
            <button 
              className="w-8 h-8 rounded-md flex items-center justify-center hover:bg-gray-100 text-neutral-gray"
              aria-label={`Download ${file.name}`}
            >
              <Download size={16} />
            </button>
          </div>
        ))}
      </div>
      
      <button className="mt-4 w-full py-2 px-3 text-sm border border-dashed border-cool-gray/40 rounded-lg text-neutral-gray hover:bg-gray-50 transition-colors">
        + Upload a file
      </button>
    </div>
  );
};

export default FileStorage;
