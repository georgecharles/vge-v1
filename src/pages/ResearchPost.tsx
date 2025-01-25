import { useParams } from 'react-router-dom';
    import { RESEARCH_REPORTS } from '@/pages/Research';
    import { PropertyHero } from '@/components/PropertyHero';
    import { Button } from '@/components/ui/button';
    import { Download, TrendingUp, FileText } from 'lucide-react';
    import { motion } from 'framer-motion';
    import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
    import { useState } from 'react';
    import { Line } from 'react-chartjs-2';
    import {
      Chart as ChartJS,
      CategoryScale,
      LinearScale,
      PointElement,
      LineElement,
      Title,
      Tooltip,
      Legend
    } from 'chart.js';

    ChartJS.register(
      CategoryScale,
      LinearScale,
      PointElement,
      LineElement,
      Title,
      Tooltip,
      Legend
    );

    export function ResearchPost() {
      const { id } = useParams();
      const report = RESEARCH_REPORTS.find(r => r.id === Number(id));
      const [isStatsModalOpen, setIsStatsModalOpen] = useState(false);

      if (!report) {
        return <div>Report not found</div>;
      }

      const handleDownload = () => {
        // In a real app, this would trigger a download
        alert('Downloading report...');
      };

      const handleOpenStats = () => {
        setIsStatsModalOpen(true);
      };

      const handleCloseStats = () => {
        setIsStatsModalOpen(false);
      };

      const chartData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
          {
            label: 'Market Growth',
            data: [1.2, 1.5, 1.8, 2.1, 2.3, 2.5, 2.7, 2.9, 3.1, 3.3, 3.5, 3.7],
            borderColor: '#F59E0B',
            backgroundColor: 'rgba(245, 158, 11, 0.1)',
            tension: 0.4
          }
        ]
      };

      const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              color: 'rgba(255, 255, 255, 0.1)'
            }
          },
          x: {
            grid: {
              color: 'rgba(255, 255, 255, 0.1)'
            }
          }
        }
      };

      return (
        <div>
          <PropertyHero
            title={report.title}
            subtitle={report.description}
            imageUrl={report.imageUrl}
          />

          <motion.div 
            className="max-w-4xl mx-auto px-4 py-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-navy-800/50 rounded-lg border border-gold-500/20 overflow-hidden">
              <div className="p-8">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-4 text-sm text-gray-400">
                    <FileText className="w-4 h-4" />
                    <span>{report.date}</span>
                    <span>{report.pages} pages</span>
                  </div>
                  <div className="flex gap-4">
                    <Button onClick={handleDownload} className="bg-gold-500 text-navy-950 hover:bg-gold-600">
                      <Download className="w-4 h-4 mr-2" />
                      Download ({report.fileSize})
                    </Button>
                    <Button variant="outline" className="border-gold-500/20" onClick={handleOpenStats}>
                      <TrendingUp className="w-4 h-4 mr-2" />
                      View Stats
                    </Button>
                  </div>
                </div>

                <div 
                  className="prose prose-invert max-w-none"
                  dangerouslySetInnerHTML={{ __html: report.content }}
                />
              </div>
            </div>
          </motion.div>

          <Dialog open={isStatsModalOpen} onOpenChange={handleCloseStats}>
            <DialogContent className="max-w-4xl bg-navy-900 border-gold-500/20">
              <DialogHeader>
                <DialogTitle className="text-2xl font-light text-white">{report.title} Stats</DialogTitle>
              </DialogHeader>
              <div className="p-6">
                <div className="h-[300px]">
                  <Line data={chartData} options={chartOptions} />
                </div>
                <div className="text-sm text-gray-400 mt-4">
                  Data source: Very Good Estates Market Analysis
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      );
    }
